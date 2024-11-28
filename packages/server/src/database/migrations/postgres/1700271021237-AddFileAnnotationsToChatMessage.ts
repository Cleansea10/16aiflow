import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddFileAnnotationsToChatMessage1700271021237 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_message" ADD COLUMN IF NOT EXISTS "fileAnnotations" TEXT;`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_message" DROP COLUMN "fileAnnotations";`)
    }
}
// Modified on Wed Jan 22 04:35:17 PM +01 2025
