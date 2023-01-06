/**
 * Root Router
 * Redirection to Routers
 */

import express, { Request, Response, Router } from "express";
import helloRouter from "./HelloRouter";
import { LogInfo } from "@/utils/logger";

// Server Instance
let server = express();

// Router Instance
let rootRouter = express.Router();


// Activate for request to http://localhost:8000/api/

// GET: http://localhost:8000/api/
rootRouter.get("/", (req: Request, res: Response) => {
    LogInfo("GET: http://localhost:8000/api/")
    // Send Hello World
    res.send("Welcome to API:Restful Express + Nodemon + Jest + TS + Swagger + Mongoose");
});

// Redirection to Routers & Controllers
server.use("/", rootRouter);
server.use("/hello", helloRouter);
// Add more routes

export default server;