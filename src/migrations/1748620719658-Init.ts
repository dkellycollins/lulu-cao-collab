import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1748620719658 implements MigrationInterface {
    name = 'Init1748620719658'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "file" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "providerKey" varchar NOT NULL, "filename" varchar NOT NULL, "contentType" varchar NOT NULL, "contentSize" integer NOT NULL, "user_id" integer, "blog_id" integer, CONSTRAINT "REL_516f1cf15166fd07b732b4b6ab" UNIQUE ("user_id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "email" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "blog" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "content" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updatedAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "author_id" integer)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "blog"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "file"`);
    }

}
