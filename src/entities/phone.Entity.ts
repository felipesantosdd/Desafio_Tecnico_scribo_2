import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './users.Entity';


@Entity()
export class PhoneNumber {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar' })
    numero: string;

    @Column({ type: 'varchar' })
    ddd: string;

    @ManyToOne(() => User, User => User.telefones)
    user: User;
}
