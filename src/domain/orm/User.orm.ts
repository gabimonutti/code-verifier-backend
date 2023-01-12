import { userEntity } from "../entities/User.entity";
import { LogSuccess, LogError } from "../../utils/logger";
import { IUser } from "../interfaces/IUser.interface";
import { IAuth } from "../interfaces/IAuth.interface";

// Environment variables
import dotenv from "dotenv";

// BCRYPT for passwords
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";
import { UserResponse } from "../types/UserResponse.type";
import { kataEntity } from "../entities/Kata.entity";
import { IKata } from "../interfaces/IKata.interface";
import mongoose, { mongo } from "mongoose";

// Configuration of environment variables
dotenv.config();

// Obtain secret jey to generate JWT
const secretKey = process.env.MY_SECRET_KEY || "MYSECRETKEY";

// CRUD

/**
 * Method to obtain all users from collection "Users" in Mongo Server
 */
export const getAllUsers = async (page:number, limit:number): Promise<any[]|undefined> => {
    try {
        let userModel = userEntity();
        
        let response: any = {};

        // Search all users (using pagination)
        await userModel.find()
            .select("name email age katas")
            .limit(limit)
            .skip((page - 1)*limit)
            .exec().then((users:IUser[]) => {
                response.users = users;
            })
        
            // Count total documents in collection
            await userModel.countDocuments().then((total:number) => {
                response.totalPages = Math.ceil(total / limit);
                response.currentPage = page;
            })

            return response;

        // Search all users
        //return await userModel.find()
    } catch (error) {
        LogError(`[ORM ERROR]: Getting All Users: ${error}`)
    }
}

/**
 * Method to obtain all katas of an specified user from collection "Katas" in Mongo Server
 */
export const getKatasFromUser = async (page:number, limit:number, id:string): Promise<any[]|undefined> => {
    try {
        let userModel = userEntity();
        let katasModel = kataEntity();
        
        let katasFound: IKata[] = [];

        let response: any = {
            katas: []
        };

        await userModel.findById(id).then(async (user:IUser) => {
            response.user = user.email;
            
            let objectIds: mongoose.Types.ObjectId[] = [];
            user.katas.forEach((kataID:string) => {
                let objectID = new mongoose.Types.ObjectId(kataID);
                objectIds.push(objectID);
            })

            await katasModel.find({"_id": {"$in": objectIds }}).then((katas:IKata[]) => {
                katasFound = katas;
            })

        }).catch((error) => {
            LogError(`[ORM ERROR]: Obtaining User: ${error}`)
        })

        response.katas = katasFound;

        return response;

        // Search all users
        //return await userModel.find()
    } catch (error) {
        LogError(`[ORM ERROR]: Getting All Users: ${error}`)
    }
}

// Get User By ID
export const getUserByID = async (id: string) : Promise <any | undefined> => {
    try {
        let userModel = userEntity();
        
        // Sear User by ID
        return await userModel.findById(id).select("name email age katas");
    } catch (error) {
        LogError(`[ORM ERROR]: Getting User By ID: ${error}}`)
    }
}

// Delete User By ID
export const deleteUserByID = async (id:string): Promise<any | undefined> => {
    try {
        let userModel = userEntity();

        // Delete user by ID
        return await userModel.deleteOne({_id:id})

    } catch (error) {
        LogError(`[ORM ERROR]: Deleting User By ID: ${error}}`)
    }
}

// Update User By ID
export const updateUser = async (id:string, user:any): Promise<any | undefined> => {
    try {
        let userModel = userEntity();

        // Update user
        return await userModel.findByIdAndUpdate(id, user);

    } catch (error) {
        LogError(`[ORM ERROR]: Updating User with ID: ${id} | ${error}}`)
    }
}

// Register User
export const registerUser = async (user:IUser): Promise<any | undefined> => {
    try {
        let userModel = userEntity();
        
        // Create / Insert new user
        return await userModel.create(user);
    } catch (error) {
        LogError(`[ORM ERROR]: Registering User: ${error}}`)
    }
}

// Login User
export const loginUser = async (auth:IAuth): Promise<any | undefined> => {
    try {
        let userModel = userEntity();
        
        let userFound: IUser | undefined = undefined;
        let token = undefined;

        // Check if user exists by Unique email
        await userModel.findOne({email:auth.email}).then((user:IUser) => {
            userFound = user;
        }).catch((error) => {
            console.error("[ERROR Authentication in ORM]: User Not Found");
            throw new Error(`[ERROR Authentication in ORM]: User Not Found: ${error}`)
        })

        // Check if password is valid (compare with bcrypt)
        let validPassword = bcrypt.compareSync(auth.password, userFound!.password);

        if(!validPassword) {
            console.error("[ERROR Authentication in ORM]: Password Not Valid");
            throw new Error(`[ERROR Authentication in ORM]: Password Not Valid`)
        }

        // Generate JWT
        token = jwt.sign({email: userFound!.email}, secretKey, {
            expiresIn: 7200
        });
        return {
            user: userFound,
            token: token
        }
    } catch (error) {
        LogError(`[ORM ERROR]: Logging In User: ${error}}`)
    }
}

// Logout User
export const logoutUser = async (): Promise<any | undefined> => {
    
}