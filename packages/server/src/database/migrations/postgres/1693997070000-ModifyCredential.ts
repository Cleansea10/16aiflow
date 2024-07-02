import { MigrationInterface, QueryRunner } from 'typeorm'

export class ModifyCredential1693997070000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "credential" ALTER COLUMN "encryptedData" TYPE TEXT;`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "credential" ALTER COLUMN "encryptedData" TYPE VARCHAR;`)
    }
}
// Modified on Wed Jan 22 04:34:39 PM +01 2025
