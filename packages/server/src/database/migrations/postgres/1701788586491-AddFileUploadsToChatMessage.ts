import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddFileUploadsToChatMessage1701788586491 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_message" ADD COLUMN IF NOT EXISTS "fileUploads" TEXT;`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_message" DROP COLUMN "fileUploads";`)
    }
}
// Modified on Wed Jan 22 04:34:34 PM +01 2025
