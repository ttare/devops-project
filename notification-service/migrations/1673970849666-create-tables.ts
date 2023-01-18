import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1673970849666 implements MigrationInterface {
    name = 'createTables1673970849666'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "notification" ("id" SERIAL NOT NULL, "provider" character varying NOT NULL DEFAULT 'email', "type" character varying NOT NULL, "userId" integer NOT NULL, "status" character varying NOT NULL, "info" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "pkey_notification_id" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "notification"`);
    }

}
