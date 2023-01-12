import { kataEntity } from "../entities/Kata.entity";
import { LogSuccess, LogError } from "../../utils/logger";
import { IKata } from "../interfaces/IKata.interface";

// Environment variables
import dotenv from "dotenv";

// Configuration of environment variables
dotenv.config();

// CRUD

/**
 * Method to obtain all users from collection "Users" in Mongo Server
 */
export const getAllKatas = async (page:number, limit:number): Promise<any[]|undefined> => {
    try {
        let kataModel = kataEntity();
        
        let response: any = {};

        // Search all users (using pagination)
        await kataModel.find()
            .limit(limit)
            .skip((page - 1)*limit)
            .exec().then((katas:IKata[]) => {
                response.katas = katas;
            })
        
            // Count total documents in collection
            await kataModel.countDocuments().then((total:number) => {
                response.totalPages = Math.ceil(total / limit);
                response.currentPage = page;
            })

            return response;

    } catch (error) {
        LogError(`[ORM ERROR]: Getting All Kata: ${error}`)
    }
}

// Get User By ID
export const getKataByID = async (id: string) : Promise <any | undefined> => {
    try {
        let kataModel = kataEntity();
        
        // Sear User by ID
        return await kataModel.findById(id);

    } catch (error) {
        LogError(`[ORM ERROR]: Getting Kata By ID: ${error}}`)
    }
}

// Delete User By ID
export const deleteKataByID = async (id:string): Promise<any | undefined> => {
    try {
        let kataModel = kataEntity();

        // Delete user by ID
        return await kataModel.deleteOne({_id:id})

    } catch (error) {
        LogError(`[ORM ERROR]: Deleting Kata By ID: ${error}}`)
    }
}

// Create new user
export const createNewKata = async (kata: any): Promise<any | undefined> => {
    try {
        let kataModel = kataEntity();
        
        // Create / Insert new user
        return await kataModel.create(kata);

    } catch (error) {
        LogError(`[ORM ERROR]: Creating Kata: ${error}}`)
    }
}

// Update User By ID
export const updateKata = async (id:string, kata:any): Promise<any | undefined> => {
    try {
        let kataModel = kataEntity();

        // Update user
        return await kataModel.findByIdAndUpdate(id, kata);

    } catch (error) {
        LogError(`[ORM ERROR]: Updating User with ID: ${id} | ${error}}`)
    }
}
