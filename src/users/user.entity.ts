import { AfterInsert, AfterRemove, AfterUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @AfterInsert()
    private logInsert(): void {
        console.log('Inserted new user with Id', this.id);
    }
    @AfterUpdate()
    private logUpdate(): void {
        console.log('Updated new user with Id', this.id);
    }
    @AfterRemove()
    private logRemove(): void {
        console.log('Removed new user with Id', this.id);
    }
}