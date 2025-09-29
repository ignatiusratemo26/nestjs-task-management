import { Injectable } from "@nestjs/common";
import { AbstractEntity } from "src/database/abstract.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Injectable()
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true})
    username: string;

    @Column()
    password: string;

    constructor(entity: Partial<User>) {
        Object.assign(this, entity);
    }
}
