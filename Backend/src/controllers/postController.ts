import { Post } from '../entites/Post';
import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { User } from '../entites/User';
import { Between, Like } from 'typeorm';

export const createPost = async (req: Request, res: Response) => {
    try {
        const postRepo = AppDataSource.getRepository(Post);
        const userRepo = AppDataSource.getRepository(User);

        const { userid, image, description, title } = req.body;
        if (userid === undefined) {
            throw new Error("Userid is NULL ");
        }
        let user = await userRepo.findOne({ where: { userid: userid } });

        if (user === null)
            throw new Error("User not found");

        let post: Post = new Post();
        post.image = image;
        post.description = description;
        post.createdAt = new Date();
        post.title = title;

        post.user = user;
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

export const getAllPost = async (req: Request, res: Response) => {
    try {

        const postRepo = AppDataSource.getRepository(Post);
        const getAllPost = await postRepo.find();
        res.status(200).json({
            success: true,
            getAllPost
        }
        );
    } catch (error) {

        res.status(401).json({
            success: false,
            message: error
        });
    }
}

export const updatePost = async (req: Request, res: Response) => {
    try {
        const postRepo = AppDataSource.getRepository(Post);
        const { postid, title, image, description } = req.body;

        const post = await postRepo.findOne({ where: { postid: postid } });
        if (post === null) {
            throw new Error(`No post found`)
        }
        post.title = title;
        post.image = image;
        post.description = description;
        // post.createdAt = new Date();

        const updatedPost = await postRepo.save(post);
        res.status(200).json({
            success: true,
            updatedPost
        }
        );
    } catch (error) {

        res.status(401).json({
            success: false,
            message: error
        });
    }
}

export const deletePost = async (req: Request, res: Response) => {
    try {
        const postRepo = AppDataSource.getRepository(Post);
        const { postid } = req.params;
        await postRepo.delete(postid);
        res.status(200).json({
            success: true,
            message: " Post deleted successfully"
        }
        );
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error
        });
    }
}

export const searchPost = async (req: Request, res: Response) => {
    try {
        const postRepo = AppDataSource.getRepository(Post);
        const { search } = req.params;
        const getAllPost: Post[] = await postRepo.find({ where: { title: Like(`%${search}%`) } });

        res.status(200).json({
            success: true,
            getAllPost
        }
        );
    } catch (error) {

        res.status(401).json({
            success: false,
            message: error
        });
    }
}

export const filterByDates = async (req: Request, res: Response) => {
    try {
        const postRepo = AppDataSource.getRepository(Post);
        const startDateString = req.query.startDateString;
        const endDateString = req.query.endDateString;
        if (typeof startDateString === "string" && typeof endDateString === "string") {
            const startDate = new Date(Date.parse(startDateString));
            const endDate = new Date(Date.parse(endDateString));
            const getAllPost: Post[] = await postRepo.find({
                where: {
                    createdAt: Between(startDate, endDate)
                }
            });

            res.status(200).json({
                success: true,
                getAllPost
            }
            );
        }
        else
            throw new Error(`Invalid Date`);

    } catch (error) {

        res.status(401).json({
            success: false,
            message: error
        });
    }
}