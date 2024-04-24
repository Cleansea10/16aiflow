import { MigrationInterface, QueryRunner } from 'typeorm'

export class ModifyCredential1693999261583 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`credential\` MODIFY \`encryptedData\` TEXT NOT NULL;`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`credential\` MODIFY \`encryptedData\` VARCHAR NOT NULL;`)
    }
}
// Modified on Wed Jan 22 04:34:22 PM +01 2025
