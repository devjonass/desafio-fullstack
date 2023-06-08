import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateClient1686246289203 implements MigrationInterface {
    name = 'CreateClient1686246289203'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "gender"`);
        await queryRunner.query(`DROP TYPE "public"."contacts_gender_enum"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "gender"`);
        await queryRunner.query(`DROP TYPE "public"."clients_gender_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."clients_gender_enum" AS ENUM('male', 'female', 'no binary', 'I prefer not to say')`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "gender" "public"."clients_gender_enum" NOT NULL DEFAULT 'I prefer not to say'`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "image" text`);
        await queryRunner.query(`CREATE TYPE "public"."contacts_gender_enum" AS ENUM('male', 'female', 'Not binary', 'Not informed')`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD "gender" "public"."contacts_gender_enum" NOT NULL DEFAULT 'Not informed'`);
    }

}
