import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class PERMISSAOROLES1634845990104 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'PERMISSAO_ROLES',
            columns: [
                {
                    name: 'CD_PERMISSAO',
                    type: 'int'
                },
                {
                    name: 'CD_ROLES',
                    type: 'int'
                }
            ],
            foreignKeys: 
            [
                {   
                    name: 'FK_PERMISSAO_ROLES',
                    columnNames: ['CD_PERMISSAO'],
                    referencedTableName: 'PERMISSAO',
                    referencedColumnNames: ['CD_PERMISSAO'],
                    onUpdate: "CASCADE",
                    onDelete: "CASCADE"

                },
                {
                    name: 'FK_ROLES_PERMISSAO',
                    columnNames: ['CD_ROLES'],
                    referencedTableName: 'ROLES',
                    referencedColumnNames: ['CD_ROLES'],
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('PERMISSAO_ROLES')
    }

}
