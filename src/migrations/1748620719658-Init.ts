import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1748620719658 implements MigrationInterface {
    name = 'Init1748620719658'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "file" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "providerKey" varchar NOT NULL, "filename" varchar NOT NULL, "contentType" varchar NOT NULL, "contentSize" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "email" varchar NOT NULL, "profile_picture_id" integer, CONSTRAINT "REL_e4238c3828bc51ff8ca27c4638" UNIQUE ("profile_picture_id"))`);
        await queryRunner.query(`CREATE TABLE "blog" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "content" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updatedAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "cover_image_id" integer, "author_id" integer, CONSTRAINT "REL_413c018fa50b488485364ad9fc" UNIQUE ("cover_image_id"))`);
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "email" varchar NOT NULL, "profile_picture_id" integer, CONSTRAINT "REL_e4238c3828bc51ff8ca27c4638" UNIQUE ("profile_picture_id"), CONSTRAINT "FK_e4238c3828bc51ff8ca27c46385" FOREIGN KEY ("profile_picture_id") REFERENCES "file" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "username", "email", "profile_picture_id") SELECT "id", "username", "email", "profile_picture_id" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
        await queryRunner.query(`CREATE TABLE "temporary_blog" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "content" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updatedAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "cover_image_id" integer, "author_id" integer, CONSTRAINT "REL_413c018fa50b488485364ad9fc" UNIQUE ("cover_image_id"), CONSTRAINT "FK_413c018fa50b488485364ad9fcd" FOREIGN KEY ("cover_image_id") REFERENCES "file" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_f8ff9a5fe63d10137f01451e0a2" FOREIGN KEY ("author_id") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_blog"("id", "title", "content", "createdAt", "updatedAt", "cover_image_id", "author_id") SELECT "id", "title", "content", "createdAt", "updatedAt", "cover_image_id", "author_id" FROM "blog"`);
        await queryRunner.query(`DROP TABLE "blog"`);
        await queryRunner.query(`ALTER TABLE "temporary_blog" RENAME TO "blog"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blog" RENAME TO "temporary_blog"`);
        await queryRunner.query(`CREATE TABLE "blog" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "content" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updatedAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "cover_image_id" integer, "author_id" integer, CONSTRAINT "REL_413c018fa50b488485364ad9fc" UNIQUE ("cover_image_id"))`);
        await queryRunner.query(`INSERT INTO "blog"("id", "title", "content", "createdAt", "updatedAt", "cover_image_id", "author_id") SELECT "id", "title", "content", "createdAt", "updatedAt", "cover_image_id", "author_id" FROM "temporary_blog"`);
        await queryRunner.query(`DROP TABLE "temporary_blog"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "email" varchar NOT NULL, "profile_picture_id" integer, CONSTRAINT "REL_e4238c3828bc51ff8ca27c4638" UNIQUE ("profile_picture_id"))`);
        await queryRunner.query(`INSERT INTO "user"("id", "username", "email", "profile_picture_id") SELECT "id", "username", "email", "profile_picture_id" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
        await queryRunner.query(`DROP TABLE "blog"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "file"`);
    }

}
