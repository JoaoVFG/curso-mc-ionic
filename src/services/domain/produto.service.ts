import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";

@Injectable()
export class ProdutoService{
    
    constructor(public httpCliente : HttpClient){

    }

    findByCategoria(categoria_id : string){
        console.log(categoria_id);
        console.log(`${API_CONFIG.baseUrl}/produtos/page/?categorias=${categoria_id}`);
        return this.httpCliente.get(`${API_CONFIG.baseUrl}/produtos/page/?categorias=${categoria_id}`);
    }
}