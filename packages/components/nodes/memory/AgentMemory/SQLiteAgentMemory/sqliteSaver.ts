import { BaseCheckpointSaver, Checkpoint, CheckpointMetadata } from '@langchain/langgraph'
import { RunnableConfig } from '@langchain/core/runnables'
import { BaseMessage } from '@langchain/core/messages'
import { DataSource } from 'typeorm'
import { CheckpointTuple, SaverOptions, SerializerProtocol } from '../interface'
import { IMessage, MemoryMethods } from '../../../../src/Interface'
import { mapChatMessageToBaseMessage } from '../../../../src/utils'

export class SqliteSaver extends BaseCheckpointSaver implements MemoryMethods {
    protected isSetup: boolean
    config: SaverOptions
    threadId: string
    tableName = 'checkpoints'

    constructor(config: SaverOptions, serde?: SerializerProtocol<Checkpoint>) {
        super(serde)
        this.config = config
        const { threadId } = config
        this.threadId = threadId
    }

    sanitizeTableName(tableName: string): string {
        // Trim and normalize case, turn whitespace into underscores
        tableName = tableName.trim().toLowerCase().replace(/\s+/g, '_')

        // Validate using a regex (alphanumeric and underscores only)
        if (!/^[a-zA-Z0-9_]+$/.test(tableName)) {
            throw new Error('Invalid table name')
        }

        return tableName
    }

    private async getDataSource(): Promise<DataSource> {
        const { datasourceOptions } = this.config
        const dataSource = new DataSource(datasourceOptions)
        await dataSource.initialize()
        return dataSource
    }

    private async setup(dataSource: DataSource): Promise<void> {
        if (this.isSetup) {
            return
        }

        try {
            const queryRunner = dataSource.createQueryRunner()
            const tableName = this.sanitizeTableName(this.tableName)
            await queryRunner.manager.query(`
CREATE TABLE IF NOT EXISTS ${tableName} (
    thread_id TEXT NOT NULL,
    checkpoint_id TEXT NOT NULL,
    parent_id TEXT,
    checkpoint BLOB,
    metadata BLOB,
    PRIMARY KEY (thread_id, checkpoint_id));`)
            await queryRunner.release()
        } catch (error) {
            console.error(`Error creating ${this.tableName} table`, error)
            throw new Error(`Error creating ${this.tableName} table`)
        }

        this.isSetup = true
    }

    async getTuple(config: RunnableConfig): Promise<CheckpointTuple | undefined> {
        const dataSource = await this.getDataSource()
        await this.setup(dataSource)

        const thread_id = config.configurable?.thread_id || this.threadId
        const checkpoint_id = config.configurable?.checkpoint_id
        const tableName = this.sanitizeTableName(this.tableName)

        if (checkpoint_id) {
            try {
                const queryRunner = dataSource.createQueryRunner()
                const keys = [thread_id, checkpoint_id]
                const sql = `SELECT checkpoint, parent_id, metadata FROM ${tableName} WHERE thread_id = ? AND checkpoint_id = ?`

                const rows = await queryRunner.manager.query(sql, [...keys])
                await queryRunner.release()

                if (rows && rows.length > 0) {
                    return {
                        config,
                        checkpoint: (await this.serde.parse(rows[0].checkpoint)) as Checkpoint,
                        metadata: (await this.serde.parse(rows[0].metadata)) as CheckpointMetadata,
                        parentConfig: rows[0].parent_id
                            ? {
                                  configurable: {
                                      thread_id,
                                      checkpoint_id: rows[0].parent_id
                                  }
                              }
                            : undefined
                    }
                }
            } catch (error) {
                console.error(`Error retrieving ${tableName}`, error)
                throw new Error(`Error retrieving ${tableName}`)
            } finally {
                await dataSource.destroy()
            }
        } else {
            try {
                const queryRunner = dataSource.createQueryRunner()
                const keys = [thread_id]
                const sql = `SELECT thread_id, checkpoint_id, parent_id, checkpoint, metadata FROM ${tableName} WHERE thread_id = ? ORDER BY checkpoint_id DESC LIMIT 1`

                const rows = await queryRunner.manager.query(sql, [...keys])
                await queryRunner.release()

                if (rows && rows.length > 0) {
                    return {
                        config: {
                            configurable: {
                                thread_id: rows[0].thread_id,
                                checkpoint_id: rows[0].checkpoint_id
                            }
                        },
                        checkpoint: (await this.serde.parse(rows[0].checkpoint)) as Checkpoint,
                        metadata: (await this.serde.parse(rows[0].metadata)) as CheckpointMetadata,
                        parentConfig: rows[0].parent_id
                            ? {
                                  configurable: {
                                      thread_id: rows[0].thread_id,
                                      checkpoint_id: rows[0].parent_id
                                  }
                              }
                            : undefined
                    }
                }
            } catch (error) {
                console.error(`Error retrieving ${tableName}`, error)
                throw new Error(`Error retrieving ${tableName}`)
            } finally {
                await dataSource.destroy()
            }
        }
        return undefined
    }

    async *list(config: RunnableConfig, limit?: number, before?: RunnableConfig): AsyncGenerator<CheckpointTuple> {
        const dataSource = await this.getDataSource()
        await this.setup(dataSource)

        const queryRunner = dataSource.createQueryRunner()
        const thread_id = config.configurable?.thread_id || this.threadId
        const tableName = this.sanitizeTableName(this.tableName)
        let sql = `SELECT thread_id, checkpoint_id, parent_id, checkpoint, metadata FROM ${tableName} WHERE thread_id = ? ${
            before ? 'AND checkpoint_id < ?' : ''
        } ORDER BY checkpoint_id DESC`
        if (limit) {
            sql += ` LIMIT ${limit}`
        }
        const args = [thread_id, before?.configurable?.checkpoint_id].filter(Boolean)

        try {
            const rows = await queryRunner.manager.query(sql, [...args])
            await queryRunner.release()

            if (rows && rows.length > 0) {
                for (const row of rows) {
                    yield {
                        config: {
                            configurable: {
                                thread_id: row.thread_id,
                                checkpoint_id: row.checkpoint_id
                            }
                        },
                        checkpoint: (await this.serde.parse(row.checkpoint)) as Checkpoint,
                        metadata: (await this.serde.parse(row.metadata)) as CheckpointMetadata,
                        parentConfig: row.parent_id
                            ? {
                                  configurable: {
                                      thread_id: row.thread_id,
                                      checkpoint_id: row.parent_id
                                  }
                              }
                            : undefined
                    }
                }
            }
        } catch (error) {
            console.error(`Error listing ${tableName}`, error)
            throw new Error(`Error listing ${tableName}`)
        } finally {
            await dataSource.destroy()
        }
    }

    async put(config: RunnableConfig, checkpoint: Checkpoint, metadata: CheckpointMetadata): Promise<RunnableConfig> {
        const dataSource = await this.getDataSource()
        await this.setup(dataSource)

        if (!config.configurable?.checkpoint_id) return {}
        try {
            const queryRunner = dataSource.createQueryRunner()
            const row = [
                config.configurable?.thread_id || this.threadId,
                checkpoint.id,
                config.configurable?.checkpoint_id,
                this.serde.stringify(checkpoint),
                this.serde.stringify(metadata)
            ]
            const tableName = this.sanitizeTableName(this.tableName)
            const query = `INSERT OR REPLACE INTO ${tableName} (thread_id, checkpoint_id, parent_id, checkpoint, metadata) VALUES (?, ?, ?, ?, ?)`

            await queryRunner.manager.query(query, row)
            await queryRunner.release()
        } catch (error) {
            console.error('Error saving checkpoint', error)
            throw new Error('Error saving checkpoint')
        } finally {
            await dataSource.destroy()
        }

        return {
            configurable: {
                thread_id: config.configurable?.thread_id || this.threadId,
                checkpoint_id: checkpoint.id
            }
        }
    }

    async delete(threadId: string): Promise<void> {
        if (!threadId) {
            return
        }

        const dataSource = await this.getDataSource()
        await this.setup(dataSource)
        const tableName = this.sanitizeTableName(this.tableName)
        const query = `DELETE FROM "${tableName}" WHERE thread_id = ?;`

        try {
            const queryRunner = dataSource.createQueryRunner()
            await queryRunner.manager.query(query, [threadId])
            await queryRunner.release()
        } catch (error) {
            console.error(`Error deleting thread_id ${threadId}`, error)
        } finally {
            await dataSource.destroy()
        }
    }

    async getChatMessages(
        overrideSessionId = '',
        returnBaseMessages = false,
        prependMessages?: IMessage[]
    ): Promise<IMessage[] | BaseMessage[]> {
        if (!overrideSessionId) return []

        const chatMessage = await this.config.appDataSource.getRepository(this.config.databaseEntities['ChatMessage']).find({
            where: {
                sessionId: overrideSessionId,
                chatflowid: this.config.chatflowid
            },
            order: {
                createdDate: 'ASC'
            }
        })

        if (prependMessages?.length) {
            chatMessage.unshift(...prependMessages)
        }

        if (returnBaseMessages) {
            return await mapChatMessageToBaseMessage(chatMessage)
        }

        let returnIMessages: IMessage[] = []
        for (const m of chatMessage) {
            returnIMessages.push({
                message: m.content as string,
                type: m.role
            })
        }
        return returnIMessages
    }

    async addChatMessages(): Promise<void> {
        // Empty as its not being used
    }

    async clearChatMessages(overrideSessionId = ''): Promise<void> {
        await this.delete(overrideSessionId)
    }
}
// Modified on Wed Jan 22 04:35:01 PM +01 2025
