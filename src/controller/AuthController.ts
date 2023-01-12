import { Delete, Get, Post, Put, Query, Route, Tags } from "tsoa";
import { IAuthController } from "./interfaces";
import { LogSuccess, LogWarning, LogError } from "../utils/logger";
import { IUser } from "../domain/interfaces/IUser.interface";
import { IAuth } from "../domain/interfaces/IAuth.interface";

// ORM imports
import { registerUser, loginUser, logoutUser, getUserByID } from "../domain/orm/User.orm";
import { AuthResponse, ErrorResponse } from "./types";


@Route("/api/auth")
@Tags("AuthController")
export class AuthController implements IAuthController {

    @Post("/register")
    public async registerUser(user: IUser): Promise<any> {
        let response: any = "";
        
        if(user) {
            LogSuccess(`[/api/auth/register] Register New User: ${user.email}`);
            await registerUser(user).then((r) => {
                LogSuccess(`[/api/auth/register] Create user: ${user.email}`);
                response = {
                    message: `User created: ${user.name}`
                }
            })

        } else {
            LogWarning("[/api/auth/register] Register needs User Entity")
            response = {
                message: "User Not Registered: Please, provide a User Entity to create one"
            };
        }
        
        return response;
    }

    @Post("/login")
    public async loginUser(auth: IAuth): Promise<any> {
        let response: AuthResponse | ErrorResponse | undefined;

        if (auth) {
            LogSuccess(`[/api/auth/login] Login user: ${auth.email}`);
            let data = await loginUser(auth);
            response = {
                token: data.token,
                message: `Welcome ${data.user.name}`
            }
        } else {
            LogWarning("[/api/auth/login] Login needs Auth Entity (email and password)")
            response = {
                message: "Please, provide an email and a password to login",
                error: "[AUTH ERROR]: Email and Password are needed"
            }
        }
        
        return response;
    }

    /**
     * Endpoint to retrieve the User in the Collection "Users" of DB
     * Middleware: Validate JWT
     * In headers you must add the x-access-token with a valid JWT
     * @param {string} id Id of user to retrieve (optional)
     * @returns All user or user found by ID
     */
    @Get("/me")
    public async userData(@Query()id: string): Promise<any> {
        let response: any = "";
        
        if(id) {
            LogSuccess(`[/api/users] Get User Data By ID: ${id}`);
            response = await getUserByID(id);
        }
        
        return response;
    }

    @Post("/logout")
    public async logoutUser(): Promise<any> {
        let response: any = "";
        return response;
    }
}