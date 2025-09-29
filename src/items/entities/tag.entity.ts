
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tag {
    constructor(entity: Partial<Tag>) {
        Object.assign(this, entity);
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;
}