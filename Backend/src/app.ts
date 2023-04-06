import "reflect-metadata"
import express from 'express';
import { AppDataSource } from "./config/database";
import { register, login, getAllUser } from "./controllers/userController";
import * as dotenv from "dotenv";
import { createPost, deletePost, filterByDates, getAllPost, searchPost, updatePost } from "./controllers/postController";


//  Environment variables 
dotenv.config({ path: __dirname + '/config/config.env' });

const app = express();
app.use(express.json());

// Routes

app.post('/signin', register);
app.post('/login', login);
app.get('/posts', getAllPost);
app.get('/users', getAllUser);
app.put('/update-post', updatePost)
app.delete('/delete-post/:postid', deletePost)
app.post('/create-post', createPost);
app.get('/posts/:search', searchPost)
app.get('/filter', filterByDates)

//  PORT 

let PORT = process.env.PORT || 5000;

AppDataSource.initialize().then(() => {
    console.log("Database Connection established")

    // Server configuration
    app.listen(PORT, () => {
        console.log(`Connected to port ${PORT}`);
    })

}).catch((err) => console.log("Database Connection Error -- > ", err));


