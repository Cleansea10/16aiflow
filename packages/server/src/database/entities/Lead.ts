/* eslint-disable */
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { ILead } from '../../Interface'

@Entity()
export class Lead implements ILead {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name?: string

    @Column()
    email?: string

    @Column()
    phone?: string

    @Column()
    chatflowid: string

    @Column()
    chatId: string

    @CreateDateColumn()
    createdDate: Date
}
// Modified on Wed Jan 22 04:34:51 PM +01 2025
