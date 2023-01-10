import { userEntity } from "../entities/User.entity";

import { LogSuccess, LogError } from "../../utils/logger";

// CRUD

/**
 * Method to obtain all users from collection "Users" in Mongo Server
 */
export const getAllUsers = async (): Promise<any[]|undefined> => {
    try {
        let userModel = userEntity();
        
        // Search all users
        return await userModel.find()
    } catch (error) {
        LogError(`[ORM ERROR]: Getting All Users: ${error}`)
    }
}

// Get User By ID
export const getUserByID = async (id: string) : Promise <any | undefined> => {
    try {
        let userModel = userEntity();
        
        // Sear User by ID
        return await userModel.findById(id);
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

// Create new user
export const createNewUser = async (user: any): Promise<any | undefined> => {
    try {
        let userModel = userEntity();
        
        // Create / Insert new user
        return await userModel.create(user);
    } catch (error) {
        LogError(`[ORM ERROR]: Creating User: ${error}}`)
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


// TODO
// Get User By Email