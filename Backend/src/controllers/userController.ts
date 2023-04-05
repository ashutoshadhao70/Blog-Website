import express, { Request, Response } from 'express';
import { User } from '../entites/User';
import { AppDataSource } from '../config/database';
import { Post } from '../entites/Post';

export const register = async (req: Request, res: Response) => {
    try {
        const userRepo = AppDataSource.getRepository(User);
        const { name, email, password, cpassword } = req.body;
        if (password !== cpassword) {
            throw new Error(" Password not Matched ");
        }
        let user: User = new User();
        user.email = email;
        user.password = password;
        user.name = name;
        const registerUser: User = await userRepo.save(user);
        res.status(200).json({
            success: true,
            registerUser
        }
        );
    } catch (error) {
        res.status(403).json({
            success: false,
            message: error
        });
    }
}
export const login = async (req: Request, res: Response) => {
    try {
        const userRepo = AppDataSource.getRepository(User);
        const { email, password } = req.body;

        const loginUser: User[] = await userRepo.find({ where: { email: email, password: password } });
        if (loginUser.length === 0) {
            throw new Error("Password or Email are Incorrect");
        }
        res.status(200).json({
            success: true,
            loginUser
        }
        );
    } catch (error) {

        res.status(403).json({
            success: false,
            message: error
        });
    }
}

export const createPost = async (req: Request, res: Response) => {
    try {
        const postRepo = AppDataSource.getRepository(Post);
        const { image, description, title } = req.body;

        let post: Post = new Post();

        post.image = image;
        post.description = description;
        post.title = title;
        
        const createdPost: Post = await postRepo.save(post)
        res.status(200).json({
            success: true,
            createdPost,
        }
        );
    } catch (error) {

        res.status(401).json({
            success: false,
            message: error
        });
    }
}