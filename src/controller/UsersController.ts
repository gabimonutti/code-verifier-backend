import { Delete, Get, Post, Put, Query, Route, Tags } from "tsoa";
import { IUsersController } from "./interfaces";
import { LogSuccess, LogWarning } from "../utils/logger";

// ORM - User Collection
import { deleteUserByID, getAllUsers, getUserByID, createNewUser, updateUser } from "../domain/orm/User.orm";

@Route("/api/users")
@Tags("UserController")
export class UserController implements IUsersController {
    /**
     * Endpoint to retrieve the Users in the Collection "Users" of DB
     * @param {string} id Id of user to retrieve (optional)
     * @returns All user or user found by ID
     */
    @Get("/")
    public async getUsers(@Query()id?: string): Promise<any> {
        let response: any = "";
        
        if(id) {
            LogSuccess(`[/api/users] Get User By ID: ${id}`);
            response = await getUserByID(id);

        } else {
            LogSuccess("[/api/users] Get All Users Request")
            response = await getAllUsers();
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

    @Post("/")
    public async createUser(user: any): Promise<any> {

        let response: any = "";
        
        await createNewUser(user).then((r) => {
            LogSuccess(`[/api/users] Create user: ${user}`);
            response = {
                message: `User created: ${user.name}`
            }
        })
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