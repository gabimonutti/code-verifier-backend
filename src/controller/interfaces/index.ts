import { deleteUserByID } from "@/domain/orm/User.orm";
import { BasicResponse } from "../types";
import { IUser } from "../../domain/interfaces/IUser.interface";
import { IKata } from "@/domain/interfaces/IKata.interface";


export interface IHelloController {
    getMessage(name?:string): Promise<BasicResponse>
}

export interface IUsersController {
    // Read all users from db || get user by ID
    getUsers(page:number, limit:number, id?: string): Promise<any>
    // Get katas of users
    getKatas(page:number, limit:number, id?:string): Promise<any>
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

export interface IKataController {
    // Read all katas from db || get kata by ID
    getKata(page:number, limit:number, id?: string): Promise<any>
    // Get all katas of an user

    // Create new kata
    createKata(kata: IKata): Promise<any>
    // Delete kata by ID
    deleteKata(id?: string): Promise<any>
    // Update kata
    updateKata(id:string, kata: IKata): Promise<any>
}