import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class USUARIOROLES1635183734657 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'USUARIO_ROLES',
            columns: [
                {
                   name: 'CD_USUARIO',
                   type: 'int' 
                },
                {
                    name: 'CD_ROLES',
                    type: 'int'
                }
            ],
            foreignKeys: [
                {
                    name: 'FK_USUARIO_ROLES',
                    columnNames: ['CD_USUARIO'],
                    referencedTableName: 'USUARIO',
                    referencedColumnNames: ['CD_USUARIO'],
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'

                },
                {
                    name: 'FK_ROLES_USUARIO',
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
        await queryRunner.dropForeignKey('PERMISSAO_ROLES', 'ROLES_PERMISSAO')
        await queryRunner.dropForeignKey('PERMISSAO_ROLES', 'ROLES_PERMISSAO')
    }

}
