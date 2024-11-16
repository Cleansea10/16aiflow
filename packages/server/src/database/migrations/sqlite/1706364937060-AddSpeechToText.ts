import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddSpeechToText1706364937060 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_flow" ADD COLUMN "speechToText" TEXT;`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_flow" DROP COLUMN "speechToText";`)
    }
}
// Modified on Wed Jan 22 04:35:14 PM +01 2025
