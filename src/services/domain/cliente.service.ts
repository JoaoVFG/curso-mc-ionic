import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { ClienteDto } from "../../models/cliente.dto";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";
import { ImageUtilService } from "../image-util.service";

@Injectable()
export class ClienteService{

    constructor(public http: HttpClient,
                public storageService : StorageService,
                public imageUtilsService : ImageUtilService){

    }
    
    findById(id : string) {
        return this.http.get(`${API_CONFIG.baseUrl}/clientes/${id}`);
 
    } 

    findByEmail(email : string) {
        return this.http.get(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
 
    }  
    
    
    getImageFromBucket(id : string) : Observable<any>{
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`;
        return this.http.get(url, {responseType : 'blob'});
    }

    insert(clienteDto : ClienteDto){
        return this.http.post(
            `${API_CONFIG.baseUrl}/clientes`,
            clienteDto,
            {
                observe: 'response',
                responseType: 'text'
            }
        )
    }

    uploadPicture(picture){
        let pictureBlob = this.imageUtilsService.dataUriToBlob(picture);
        let formData : FormData = new FormData();
        formData.set('file', pictureBlob, 'file.png');

        return this.http.post(
            `${API_CONFIG.baseUrl}/clientes/picture`,
            formData,
            {
                observe: 'response',
                responseType: 'text'
            }
        )
    }
}