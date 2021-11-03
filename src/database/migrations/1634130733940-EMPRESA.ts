import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class EMPRESA1634130733940 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'EMPRESA',
            columns: [
                {
                    name: "CNPJ",
                    type: "varchar(20)",
                    isPrimary: true,
                    isNullable: false,
                },
                {
                    name: 'NOME',
                    type: 'varchar(50)'
                },
                {
                    name: 'DATA_EXE',
                    type: 'timestamp'
                },
                {
                    name: 'DATA_ENVIO',
                    type: 'timestamp',
                    default: 'now()'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('EMPRESA')
    }

}
