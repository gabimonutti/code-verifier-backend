import { deleteUserByID } from "@/domain/orm/User.orm";
import { BasicResponse } from "../types";
import { IUser } from "../../domain/interfaces/IUser.interface";


export interface IHelloController {
    getMessage(name?:string): Promise<BasicResponse>
}

export interface IUsersController {
    // Read all users from db || get user by ID
    getUsers(id?: string): Promise<any>
    // Delete user by ID
    deleteUser(id?:string): Promise<any>
    // Update user
    updateUser(id:string, user:any): Promise<any>
}

export interface IAuthController {
    // Register user
    registerUser(user:IUser): Promise<any>
    // Login user
    loginUser(auth:any): Promise<any>    
    // Logout user
    logoutUser(): Promise<any>
}