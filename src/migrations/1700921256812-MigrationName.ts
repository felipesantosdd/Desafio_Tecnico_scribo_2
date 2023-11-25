import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationName1700921256812 implements MigrationInterface {
    name = 'MigrationName1700921256812'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "phone_number" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "numero" character varying NOT NULL, "ddd" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_c16f58426537a660b3f2a26e983" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(60) NOT NULL, "email" character varying(60) NOT NULL, "senha" character varying NOT NULL, "data_criacao" TIMESTAMP NOT NULL DEFAULT now(), "data_atualizacao" date, "ultimo_login" date, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "phone_number" ADD CONSTRAINT "FK_10163df90f85bca68c3e67d090a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "phone_number" DROP CONSTRAINT "FK_10163df90f85bca68c3e67d090a"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "phone_number"`);
    }

}
