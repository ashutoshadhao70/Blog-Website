import "reflect-metadata"
import express from 'express';
import { AppDataSource } from "./config/database";
import { register, login, createPost } from "./controllers/userController";

const app = express();
app.use(express.json());

// Routes

app.post('/signin', register);
app.post('/login', login);
app.post('/create-post', createPost);

//  PORT 

let PORT = 4000 || process.env.PORT;

AppDataSource.initialize().then(() => {
    console.log("Database Connection established")

    // Server configuration
    app.listen(PORT, () => {
        console.log(`Connected to port ${PORT}`);
    })

}).catch((err) => console.error("Database Connection Error -- > ", err));


