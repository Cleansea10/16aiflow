import { MigrationInterface, QueryRunner } from 'typeorm'

export class ModifyChatMessage1693999022236 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`chat_message\` MODIFY \`sourceDocuments\` TEXT;`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`chat_message\` MODIFY \`sourceDocuments\` VARCHAR;`)
    }
}
// Modified on Wed Jan 22 04:35:01 PM +01 2025
