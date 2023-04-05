// Connection to  Database Server
import { DataSource } from "typeorm";
import { User } from "../entites/User";
import { Post } from "../entites/Post";
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: "postgres",
    password: "Number123",
    database: "Blog_App",
    entities: [User, Post],
    synchronize: true,
    logging: true
});