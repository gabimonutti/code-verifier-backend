import express, { Request, Response } from "express";
import { KatasController } from "../controller/KatasController";
import { LogInfo } from "../utils/logger";

// Body Parser to read BODY from request
import bodyParser from "body-parser";

let jsonParser = bodyParser.json();

// JWT Verification MiddleWare
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { IKata, KataLevel } from "../domain/interfaces/IKata.interface";

// Router from express
let katasRouter = express.Router();

// http://localhost:8000/api/users?id=63bcdbf013dc414caffce126/
katasRouter.route("/")
    // GET:
    .get(verifyToken, async (req:Request, res:Response) => {
        // Obtain a Query Param
        let id:any = req?.query?.id;

        // Pagination 
        let page:any = req?.query?.page || 1;
        let limit:any = req?.query?.limit || 10;

        LogInfo(`Query Param: ${id}`);

        // Controller Instance to execute method
        const controller: KatasController = new KatasController();

        // Obtain Response
        const response: any = await controller.getKata(page, limit, id);

        // Send to the client the response
        return res.status(200).send(response);
    })
    // DELETE
    .delete(verifyToken, async (req:Request, res:Response) => {
        // Obtain a Query Param
        let id:any = req?.query?.id;
        LogInfo(`Query Param: ${id}`);

        // Controller Instance to execute method
        const controller: KatasController = new KatasController();

        // Obtain Response
        const response: any = await controller.deleteKata(id);

        // Send to the client the response
        return res.status(200).send(response);
    })
    // PUT
    .put(jsonParser, verifyToken, async (req:Request, res:Response) => {
        // Obtain a Query Param
        let id:any = req?.query?.id;

        // Read from body
        let name:string = req?.body?.name;
        let description:string = req?.body?.description;
        let level:KataLevel = req?.body?.level || KataLevel.BASIC;
        let intents:number = req?.body?.intents || 0;
        let stars:number = req?.body?.stars || 0;
        let creator:string = req?.body?.creator;
        let solution:string = req?.body?.solution;
        let participants:string[] = req?.body?.participants || ["a"];

        if (name && description && level && intents >= 0 && stars >= 0 && creator && solution && participants.length >= 0) {
            // Controller Instance to execute method
            const controller: KatasController = new KatasController();

            let kata: IKata = {
                name: name,
                description: description,
                level: level,
                intents: intents,
                stars: stars,
                creator: creator,
                solution: solution,
                participants: participants
            }

            // Obtain Response
            const response: any = await controller.updateKata(id, kata);

            // Send to the client the response
            return res.status(200).send(response);
        } else {
            return res.status(400).send({
                message: "[ERROR] Updating kata. You need to send all the attributes of the kata"
            });
        }
    })
    .post(jsonParser, verifyToken, async (req:Request, res:Response) => {
        // Read from body
        let name:string = req?.body?.name;
        let description:string = req?.body?.description;
        let level:KataLevel = req?.body?.level || KataLevel.BASIC;
        let intents:number = req?.body?.intents || 0;
        let stars:number = req?.body?.stars || 0;
        let creator:string = req?.body?.creator;
        let solution:string = req?.body?.solution;
        let participants:string[] = req?.body?.participants || ["a"];

        if (name && description && level && intents >= 0 && stars >= 0 && creator && solution && participants.length >= 0) {
            // Controller Instance to execute method
            const controller: KatasController = new KatasController();

            let kata: IKata = {
                name: name,
                description: description,
                level: level,
                intents: intents,
                stars: stars,
                creator: creator,
                solution: solution,
                participants: participants
            }

            // Obtain Response
            const response: any = await controller.createKata(kata);

            // Send to the client the response
            return res.status(201).send(response);
        } else {
            return res.status(400).send({
                message: "[ERROR] Updating kata. You need to send all the attributes of the kata"
            });
        }        
    })


// Export User Router
export default katasRouter;


// MIN -1:02:30