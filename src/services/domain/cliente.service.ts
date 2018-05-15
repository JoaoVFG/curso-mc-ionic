import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { ClienteDto } from "../../models/cliente.dto";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";

@Injectable()
export class ClienteService{

    constructor(public http: HttpClient,
                public storageService : StorageService){

    }
    
    findByEmail(email : string) : Observable<ClienteDto>{
 
        return this.http.get<ClienteDto>(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
 
    }  
    
    
    getImageFromBucket(id : string) : Observable<any>{
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`;
        return this.http.get(url, {responseType : 'blob'});
    }
}