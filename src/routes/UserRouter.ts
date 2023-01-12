import express, { Request, Response } from "express";
import { UserController } from "../controller/UsersController";
import { LogInfo } from "../utils/logger";

// Body Parser to read BODY from request
import bodyParser from "body-parser";

let jsonParser = bodyParser.json();

// JWT Verification MiddleWare
import { verifyToken } from "../middlewares/verifyToken.middleware";

// Router from express
let userRouter = express.Router();

// http://localhost:8000/api/users?id=63bcdbf013dc414caffce126/
userRouter.route("/")
    // GET:
    .get(verifyToken, async (req:Request, res:Response) => {
        // Obtain a Query Param
        let id:any = req?.query?.id;

        // Pagination 
        let page:any = req?.query?.page || 1;
        let limit:any = req?.query?.limit || 10;

        LogInfo(`Query Param: ${id}`);

        // Controller Instance to execute method
        const controller: UserController = new UserController();

        // Obtain Response
        const response: any = await controller.getUsers(page, limit, id);

        // Send to the client the response
        return res.status(200).send(response);
    })
    // DELETE
    .delete(verifyToken, async (req:Request, res:Response) => {
        // Obtain a Query Param
        let id:any = req?.query?.id;
        LogInfo(`Query Param: ${id}`);

        // Controller Instance to execute method
        const controller: UserController = new UserController();

        // Obtain Response
        const response: any = await controller.deleteUser(id);

        // Send to the client the response
        return res.status(200).send(response);
    })
    // PUT
    .put(verifyToken, async (req:Request, res:Response) => {
        // Obtain a Query Param
        let id:any = req?.query?.id;
        let name:any = req?.query?.name;
        let age:any = req?.query?.age;
        let email:any = req?.query?.email;
        LogInfo(`Query Param: ${id}, ${name}, ${email}, ${age}`);

        // Controller Instance to execute method
        const controller: UserController = new UserController();

        let user1 = {
            name: name,
            email: email,
            age: age
        }

        // Obtain Response
        const response: any = await controller.updateUser(id, user1);

        // Send to the client the response
        return res.status(200).send(response);
    });

userRouter.route("/katas")
    .get(verifyToken, async (req:Request, res:Response) => {
        // Obtain a Query Param
        let id:any = req?.query?.id;

        // Pagination 
        let page:any = req?.query?.page || 1;
        let limit:any = req?.query?.limit || 10;

        // Controller Instance to execute method
        const controller: UserController = new UserController();

        // Obtain Response
        const response: any = await controller.getKatas(page, limit, id);
        // Send to the client the response
        return res.status(200).send(response);
    })


// Export User Router
export default userRouter;
