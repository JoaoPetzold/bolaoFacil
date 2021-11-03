import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class ROLES1634844994853 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'ROLES',
            columns: [
                {
                    name: "CD_ROLES",
                    type: "int",
                    isPrimary: true,
                    isNullable: false,
                    isGenerated: true, //true significa que é gerada automaticamente a coluna
                    generationStrategy: 'increment' //auto-increment
                },
                {
                    name: 'NOME',
                    type: 'varchar'
                },
                {
                    name: 'DESCRICAO',
                    type: 'text'
                },
                {
                    name: 'CREATE_AT',
                    type: 'timestamp',
                    default: 'now()'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('ROLES')
    }

}
