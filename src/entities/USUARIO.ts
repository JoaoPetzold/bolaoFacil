import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate, ManyToMany, JoinTable } from "typeorm";
import bcrypt from 'bcryptjs';
import Roles from './ROLES';

@Entity('USUARIO')
export default class Usuario {
    @PrimaryGeneratedColumn('increment')
    CD_USUARIO: number;

    @Column()
    NOME: string;

    @Column()
    SENHA: string;

    @ManyToMany(() => Roles, roles => roles.USUARIOS,{
        cascade: ['update', 'insert']
    })
    @JoinTable({
        name: 'USUARIO_ROLES',
        joinColumns: [{name: 'CD_USUARIO'}],
        inverseJoinColumns: [{name: 'CD_ROLES'}]
    })
    ROLES: Roles[];

    @BeforeUpdate()
    @BeforeInsert()
    hashPassword(){
        this.SENHA = bcrypt.hashSync(this.SENHA, 8)
    }

    
}