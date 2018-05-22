import { StorageService } from "./storage.service";
import { Injectable } from "@angular/core";
import { Cart } from "../models/cart";
import { ProdutoDto } from "../models/produto.dto";


@Injectable()
export class CartService{

    constructor(public storageService : StorageService){

    }

    createOrClearCart() : Cart{
        let cart : Cart = {items: []};
        this.storageService.setCart(cart);
        return cart;
    }

    getCart() : Cart{
        let cart : Cart =  this.storageService.getCart();
       if (cart == null){
           this.createOrClearCart();
       }
       return cart;
    }

    addProduto(produto : ProdutoDto) : Cart{
        let cart = this.getCart();
        //find index retorna a posição
        //encontrar x talque o id do produto de x seja igual o id do produto que eu passei
        let position = cart.items.findIndex(x => x.produtoDto.id == produto.id);
        //se não encontrar um item, findIndex retorna sempre -1
        if (position == -1){
            //metodo push insere elemento na lista
            cart.items.push({quantidade : 1, produtoDto : produto});
        }

        this.storageService.setCart(cart);
        return cart;
    }
}