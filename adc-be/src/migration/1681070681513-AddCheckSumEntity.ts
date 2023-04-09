import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCheckSumEntity1681070681513 implements MigrationInterface {
    name = 'AddCheckSumEntity1681070681513'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "checksum" ("id" SERIAL NOT NULL, "checksum" character varying NOT NULL, "filename" character varying NOT NULL, "user_id" character varying NOT NULL, CONSTRAINT "PK_4cdb7d1143cec7d2bd0269a892e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "checksum" ADD CONSTRAINT "FK_ccf77a7235bc4ebd4cf1a14af50" FOREIGN KEY ("user_id") REFERENCES "user_adc"("auth0_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "checksum" DROP CONSTRAINT "FK_ccf77a7235bc4ebd4cf1a14af50"`);
        await queryRunner.query(`DROP TABLE "checksum"`);
    }

}
