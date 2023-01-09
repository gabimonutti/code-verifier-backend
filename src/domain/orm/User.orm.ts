import { userEntity } from "../entities/User.entity";

import { LogSuccess, LogError } from "@/utils/logger";

// CRUD

/**
 * Method to obtain all users from collection "Users" in Mongo Server
 */
export const GetAllUser = async (): Promise<any[]|undefined> => {
    try {
        let userModel = userEntity();
        
        // Search all users
        return await userModel.find({isDelete:false})
    } catch (error) {
        LogError(`[ORM ERROR]: Getting All Users: ${error}`)
    }
}


// TODO
// Get User By ID
// Get User By Email
// Delete User By ID
// Update User By ID