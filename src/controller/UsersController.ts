import { Delete, Get, Post, Put, Query, Route, Tags } from "tsoa";
import { IUsersController } from "./interfaces";
import { LogSuccess, LogWarning } from "../utils/logger";

// ORM - User Collection
import { deleteUserByID, getAllUsers, getKatasFromUser, getUserByID, updateUser } from "../domain/orm/User.orm";
import { IUser } from "../domain/interfaces/IUser.interface";


@Route("/api/users")
@Tags("UserController")
export class UserController implements IUsersController {
    /**
     * Endpoint to retrieve the Users in the Collection "Users" of DB
     * @param {string} id Id of user to retrieve (optional)
     * @returns All user or user found by ID
     */
    @Get("/")
    public async getUsers(@Query()page:number, @Query()limit:number,@Query()id?: string): Promise<any> {
        let response: any = "";
        
        if(id) {
            LogSuccess(`[/api/users] Get User By ID: ${id}`);
            response = await getUserByID(id);

        } else {
            LogSuccess("[/api/users] Get All Users Request")
            response = await getAllUsers(page, limit);
        }
        
        return response;
    }

    @Get("/katas")
    public async getKatas(@Query()page:number, @Query()limit:number,@Query()id: string | undefined): Promise<any> {
        let response: any = "";
        
        if(id) {
            LogSuccess(`[/api/users/katas] Get Katas from User By ID: ${id}`);
            response = await getKatasFromUser(page, limit, id);

        } else {
            LogSuccess("[/api/users/katas] Get All Katas without ID")
            response = {
                message: "ID from user is needed"
            }
        }

        return response;
    }

    /**
     * Endpoint to delete an user in the Collection "Users" of DB
     * @param {string} id Id of user to retrieve (optional)
     * @returns message informing if the user was deleted correctly
     */
    @Delete("/")
    public async deleteUser(@Query()id?: string): Promise<any> {
        let response: any = "";
        
        if(id) {
            LogSuccess(`[/api/users] Delete User By ID: ${id}`);
            await deleteUserByID(id).then((r) => {
                response = {
                    message: `User with ID: ${id} deleted successfully`
                }
            })

        } else {
            LogWarning("[/api/users] Delete User Request WITHOUT ID")
            response = {
                message: "Please, provide an ID to remove from DB"
            };
        }
        
        return response;
    }

    @Put("/")
    public async updateUser(@Query()id: string, user: any): Promise<any> {
        let response: any = "";
        
        if(id) {
            LogSuccess(`[/api/users] Update User By ID: ${id}`);
            await updateUser(id, user).then((r) => {
                response = {
                    message: `User with ID: ${id} updated successfully`
                }
            })

        } else {
            LogWarning("[/api/users] Update User Request WITHOUT ID")
            response = {
                message: "Please, provide an ID to update an existing user"
            };
        }
        
        return response;
    }
}