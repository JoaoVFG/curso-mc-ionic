import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PedidoDto } from "../../models/pedido.dto";
import { API_CONFIG } from "../../config/api.config";

@Injectable()
export class PedidoService{

    constructor(public httpClient : HttpClient){

    }
    

    insert(pedido : PedidoDto){
        
        return this.httpClient.post(
            `${API_CONFIG.baseUrl}/pedidos`,
            pedido,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

}