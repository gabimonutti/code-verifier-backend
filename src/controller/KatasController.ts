import { Delete, Get, Post, Put, Query, Route, Tags } from "tsoa";
import { LogSuccess, LogWarning } from "../utils/logger";
import { IKataController } from "./interfaces";

// ORM - Kata Collection
import { createNewKata, deleteKataByID, getAllKatas, getKataByID, updateKata } from "../domain/orm/Kata.orm";
import { IKata } from "@/domain/interfaces/IKata.interface";

@Route("/api/katas")
@Tags("KatasController")
export class KatasController implements IKataController {
    /**
     * Endpoint to retrieve the Katas in the Collection "Katas" of DB
     * @param {string} id Id of kata to retrieve (optional)
     * @returns All katas or kata found by ID
     */
    @Get("/")
    public async getKata(@Query()page:number, @Query()limit:number,@Query()id?: string): Promise<any> {
        let response: any = "";
        
        if(id) {
            LogSuccess(`[/api/users] Get Kata By ID: ${id}`);
            response = await getKataByID(id);

        } else {
            LogSuccess("[/api/users] Get All Katas Request")
            response = await getAllKatas(page, limit);
        }
        
        return response;
    }

    @Post("/")
    public async createKata(kata: IKata): Promise<any> {
        let response: any = "";
        
        if(kata) {
            LogSuccess(`[/api/katas] Register New Kata: ${kata.name}`);
            await createNewKata(kata).then((r) => {
                LogSuccess(`[/api/katas] Create Kata: ${kata.name}`);
                response = {
                    message: `Kata created: ${kata.name}`
                }
            })

        } else {
            LogWarning("[/api/katas] Register needs Kata Entity")
            response = {
                message: "Kata Not Registered: Please, provide a Kata Entity to create one"
            };
        }
        
        return response;
    }

    /**
     * Endpoint to delete a kata in the Collection "Katas" of DB
     * @param {string} id Id of kata to retrieve (optional)
     * @returns message informing if the kata was deleted correctly
     */
    @Delete("/")
    public async deleteKata(@Query()id?: string): Promise<any> {
        let response: any = "";
        
        if(id) {
            LogSuccess(`[/api/users] Delete Kata By ID: ${id}`);
            await deleteKataByID(id).then((r) => {
                response = {
                    message: `Kata with ID: ${id} deleted successfully`
                }
            })

        } else {
            LogWarning("[/api/users] Delete Kata Request WITHOUT ID")
            response = {
                message: "Please, provide an ID to remove from DB"
            };
        }
        
        return response;
    }

    @Put("/")
    public async updateKata(@Query()id: string, user: any): Promise<any> {
        let response: any = "";
        
        if(id) {
            LogSuccess(`[/api/users] Update Kata By ID: ${id}`);
            await updateKata(id, user).then((r) => {
                response = {
                    message: `Kata with ID: ${id} updated successfully`
                }
            })

        } else {
            LogWarning("[/api/users] Update Kata Request WITHOUT ID")
            response = {
                message: "Please, provide an ID to update an existing user"
            };
        }
        
        return response;
    }
    
}