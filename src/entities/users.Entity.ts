import "reflect-metadata";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PhoneNumber } from "./phone.Entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: "varchar", length: 60 })
    nome: string;

    @Column({ type: "varchar", length: 60, unique: true })
    email: string;

    @Column({ type: "varchar" })
    senha: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    data_criacao: Date

    @Column({ type: "date", nullable: true })
    data_atualizacao: Date

    @Column({ type: "date", nullable: true })
    ultimo_login: Date

    @OneToMany(() => PhoneNumber, PhoneNumber => PhoneNumber.user, { cascade: true })
    @JoinColumn()
    telefones: PhoneNumber[];

}
