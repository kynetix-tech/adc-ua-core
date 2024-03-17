import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialCreate1678829576675 implements MigrationInterface {
    name = 'InitialCreate1678829576675'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_adc_gender_enum" AS ENUM('Male', 'Female', 'Other')`);
        await queryRunner.query(`CREATE TYPE "public"."user_adc_role_enum" AS ENUM('User', 'PostEditor')`);
        await queryRunner.query(`CREATE TABLE "user_adc" ("auth0_id" character varying NOT NULL, "email" character varying NOT NULL, "first_name" character varying(100) NOT NULL, "last_name" character varying(100) NOT NULL, "gender" "public"."user_adc_gender_enum" NOT NULL, "role" "public"."user_adc_role_enum" NOT NULL DEFAULT 'User', CONSTRAINT "UQ_6b2506e4249b7e4b8981d03112c" UNIQUE ("email"), CONSTRAINT "PK_f3231394b7eaeadabdc6f3bf1f7" PRIMARY KEY ("auth0_id"))`);
        await queryRunner.query(`CREATE TABLE "post" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP, "title" character varying(400) NOT NULL, "content" json, "user_id" character varying, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comment" ("id" SERIAL NOT NULL, "replyID" integer, "likes" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "text" character varying NOT NULL, "post_id" integer, "user_id" character varying, CONSTRAINT "REL_bbfe153fa60aa06483ed35ff4a" UNIQUE ("user_id"), CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_52378a74ae3724bcab44036645b" FOREIGN KEY ("user_id") REFERENCES "user_adc"("auth0_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_8aa21186314ce53c5b61a0e8c93" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_bbfe153fa60aa06483ed35ff4a7" FOREIGN KEY ("user_id") REFERENCES "user_adc"("auth0_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_bbfe153fa60aa06483ed35ff4a7"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_8aa21186314ce53c5b61a0e8c93"`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_52378a74ae3724bcab44036645b"`);
        await queryRunner.query(`DROP TABLE "comment"`);
        await queryRunner.query(`DROP TABLE "post"`);
        await queryRunner.query(`DROP TABLE "user_adc"`);
        await queryRunner.query(`DROP TYPE "public"."user_adc_role_enum"`);
        await queryRunner.query(`DROP TYPE "public"."user_adc_gender_enum"`);
    }

}
