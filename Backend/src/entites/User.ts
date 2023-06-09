import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Post } from "./Post";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    userid: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Post, (post) => post.user, { cascade: true })
    posts: Post[];

}
