import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, ManyToMany, JoinTable, JoinColumn } from "typeorm";
import Roles from './ROLES';

@Entity('PERMISSAO')
export default class Permissao {
    @PrimaryGeneratedColumn('increment')
    CD_PERMISSAO: number;

    @Column()
    NOME: string;

    @Column()
    DESCRICAO: string;

    @CreateDateColumn()
    @UpdateDateColumn({name: 'CREATE_AT'})
    CREATE_AT: Date;

    @ManyToMany(() => Roles, roles => roles.PERMISSAO,{
        cascade: ['update', 'insert']
    })
    @JoinTable({
        //NOME DA TABELA QUE CONTEM AS DUAS CHAVES
        name: 'PERMISSAO_ROLES',
        //NOME DA COLUNA DESTA ENTIDADE AQUI ONDE VAI PEGAR O CODIGO DE REFERENCIA
        joinColumns: [{name: 'CD_PERMISSAO'}],
        //NOME DA COLUNA DA ENTIDADE REVERSA ONDE VAI PEGAR O CODIGO DE REFERENCIA 
        inverseJoinColumns: [{name: 'CD_ROLES'}]
    })
    ROLES: Roles[];
}