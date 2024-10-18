import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddLeadToChatMessage1711537986113 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_message" ADD COLUMN "leadEmail" TEXT;`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_message" DROP COLUMN "leadEmail";`)
    }
}
// Modified on Wed Jan 22 04:35:07 PM +01 2025
