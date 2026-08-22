import { MigrationInterface, QueryRunner } from "typeorm";

export class InitPostgres1787342056778 implements MigrationInterface {
    name = 'InitPostgres1787342056778'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "file" ("id" SERIAL NOT NULL, "providerKey" character varying NOT NULL, "filename" character varying NOT NULL, "contentType" character varying NOT NULL, "contentSize" integer NOT NULL, CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "profile_picture_id" integer, CONSTRAINT "REL_e4238c3828bc51ff8ca27c4638" UNIQUE ("profile_picture_id"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "blog" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "content" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "cover_image_id" integer, "author_id" integer, CONSTRAINT "REL_413c018fa50b488485364ad9fc" UNIQUE ("cover_image_id"), CONSTRAINT "PK_85c6532ad065a448e9de7638571" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_e4238c3828bc51ff8ca27c46385" FOREIGN KEY ("profile_picture_id") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "blog" ADD CONSTRAINT "FK_413c018fa50b488485364ad9fcd" FOREIGN KEY ("cover_image_id") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "blog" ADD CONSTRAINT "FK_f8ff9a5fe63d10137f01451e0a2" FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blog" DROP CONSTRAINT "FK_f8ff9a5fe63d10137f01451e0a2"`);
        await queryRunner.query(`ALTER TABLE "blog" DROP CONSTRAINT "FK_413c018fa50b488485364ad9fcd"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_e4238c3828bc51ff8ca27c46385"`);
        await queryRunner.query(`DROP TABLE "blog"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "file"`);
    }

}
