import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddActionToChatMessage1721078251523 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_message" ADD COLUMN IF NOT EXISTS "action" TEXT;`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_message" DROP COLUMN "action";`)
    }
}
// Modified on Wed Jan 22 04:35:32 PM +01 2025
