import { Entity, Column, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity("EMPRESA")
export default class Empresa{
    @PrimaryColumn()
    CNPJ: string;

    @Column()
    NOME: string;
    
    @Column()
    DATA_EXE: Date;

    @UpdateDateColumn({name: 'DATA_ENVIO'})
    DATA_ENVIO: Date;
} 