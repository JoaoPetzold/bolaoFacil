import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, ManyToMany, JoinTable } from "typeorm";
import Permissao from './PERMISSAO';
import Usuario from "./USUARIO";

@Entity('ROLES')
export default class Roles {
    @PrimaryGeneratedColumn('increment')
    CD_ROLES: number;

    @Column()
    NOME: string;

    @Column()
    DESCRICAO: string;

    @CreateDateColumn()
    @UpdateDateColumn({name: 'CREATE_AT'})
    CREATE_AT: Date;

    @ManyToMany(() => Permissao, permissao => permissao.ROLES,{
        cascade: ['insert', 'update']
    })
    @JoinTable({
        name: 'PERMISSAO_ROLES',
        joinColumns: [{name: 'CD_ROLES'}],
        inverseJoinColumns: [{name: 'CD_PERMISSAO'}]
    })
    PERMISSAO: Permissao[];

    @ManyToMany(() => Usuario, usuario => usuario.ROLES, {
        cascade: ['insert', 'update']
    })
    @JoinTable({
        name: 'USUARIO_ROLES',
        joinColumns: [{name: 'CD_ROLES'}],
        inverseJoinColumns: [{name: 'CD_USUARIO'}]
    })
    USUARIOS: Usuario[];
}