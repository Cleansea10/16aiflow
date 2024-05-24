import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddCategoryToChatFlow1699900910291 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_flow" ADD COLUMN IF NOT EXISTS "category" TEXT;`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_flow" DROP COLUMN "category";`)
    }
}
// Modified on Wed Jan 22 04:34:29 PM +01 2025
