import { MigrationInterface, QueryRunner } from "typeorm";

export class CarSpecificationColumnsForPostEntity1680440967543 implements MigrationInterface {
    name = 'CarSpecificationColumnsForPostEntity1680440967543'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" ADD "likes" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "post" ADD "carYear" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "post" ADD "car_make_id" integer`);
        await queryRunner.query(`ALTER TABLE "post" ADD "car_model_id" integer`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_52378a74ae3724bcab44036645b"`);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "user_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_a86761a7f78574123c430b1ec5d" FOREIGN KEY ("car_make_id") REFERENCES "car_make"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_b53921acfdd94c1c9440c047fac" FOREIGN KEY ("car_model_id") REFERENCES "car_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_52378a74ae3724bcab44036645b" FOREIGN KEY ("user_id") REFERENCES "user_adc"("auth0_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_52378a74ae3724bcab44036645b"`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_b53921acfdd94c1c9440c047fac"`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_a86761a7f78574123c430b1ec5d"`);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "user_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_52378a74ae3724bcab44036645b" FOREIGN KEY ("user_id") REFERENCES "user_adc"("auth0_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "car_model_id"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "car_make_id"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "carYear"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "likes"`);
    }

}
