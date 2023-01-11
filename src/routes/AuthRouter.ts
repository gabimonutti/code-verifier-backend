import express, { Request, Response } from "express";
import { AuthController } from "../controller/AuthController";
import { IUser } from "../domain/interfaces/IUser.interface";
import { IAuth } from "../domain/interfaces/IAuth.interface";

// BCRIPT for passwords
import bcrypt from "bcrypt";

// MiddleWare
import { verifyToken } from "../middlewares/verifyToken.middleware";

// Body Parser
import bodyParser from "body-parser";

// Middleware to read JSON in Body
let jsonParser = bodyParser.json();

// Router from express
let authRouter = express.Router();

authRouter.route("/register")
    .post(jsonParser, async (req:Request, res:Response) => {
        let { name, email, age, password } = req?.body;
        let hashedPassword = "";

        if(name && email && age && password) {
            
            // Obtain password in request and cypher
            hashedPassword = bcrypt.hashSync(password, 8);

            // Controller Instance to execute method
            const controller: AuthController = new AuthController();

            let user:IUser = {
                name: name,
                email: email,
                age: age,
                password: hashedPassword
            }

            // Obtain Response
            const response: any = await controller.registerUser(user);

            // Send to the client the response
            return res.status(200).send(response);
        } else {
            // Sent to the client the response
            return res.status(400).send({
                message:"[ERROR User Data missing]: No user can be registered"
            })
        }
    })

authRouter.route("/login")
    .post(jsonParser, async (req:Request, res:Response) => {
        let { email, password } = req?.body;

        if(email && password) {
            // Controller Instance to execute method
            const controller: AuthController = new AuthController();

            // userAuth
            let auth: IAuth = {
                email: email,
                password:password
            }

            // Obtain Response
            const response: any = await controller.loginUser(auth);
            console.log(response);
            // Send to the client the response which includes the JWT to authorize requests
            return res.status(200).send(response);
        } else {
            // Sent to the client the response
            return res.status(400).send({
                message:"[ERROR User Data missing]: No user can be logged in"
            })
        }
    })


// Route Protected by VERIFY TOKEN Middleware
authRouter.route("/me")
    .get(verifyToken, async (req:Request, res:Response) => {
        // Obtain user ID to check its data
        let id: any = req?.query?.id;

        if (id) {
            // Controller: Auth Controller
            const controller:AuthController = new AuthController();

            // Obtain response from Controller
            let response: any = await controller.userData(id);

            return res.status(200).send(response);
        } else {
            return res.status(401).send({
                message: "You are not authorized to perform this action"
            })
        }


    })


export default authRouter;