import { MigrationInterface, QueryRunner } from "typeorm";

export class PostCarYearNullableAndFixJson1680542688201 implements MigrationInterface {
    name = 'PostCarYearNullableAndFixJson1680542688201'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "content" SET DEFAULT '[]'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "content" DROP DEFAULT`);
    }

}
