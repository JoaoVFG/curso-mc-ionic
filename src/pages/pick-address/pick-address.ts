import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDto } from '../../models/endereco.dto';
import { StorageService } from '../../services/storage.service';
import { ClienteService } from '../../services/domain/cliente.service';
import { PedidoDto } from '../../models/pedido.dto';
import { CartService } from '../../services/cart.sevice';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items : EnderecoDto[];

  pedido : PedidoDto;  

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public storage : StorageService,
              public clienteService : ClienteService,
              public cartService : CartService) {
  }

   ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email){
      
      this.clienteService.findByEmail(localUser.email)
          .subscribe(response =>{
            //as -> cast
            this.items = response['enderecos'];

            let cart = this.cartService.getCart();
            
            this.pedido = {
              cliente : {id : response["id"]},
              endereceDeEntrega : null,
              pagamento : null,
              itens : cart.items.map(x => {
                                            return {
                                                     quantidade : x.quantidade,
                                                     produto : { id : x.produtoDto.id}   
                                                   }        
                                          })

            };
          

          },
          error =>{
            if(error.status == 403){
              this.navCtrl.setRoot('HomePage');
            }
          });
    }
    else{
      this.navCtrl.setRoot('HomePage');
    }
   }

   
   nextPage(item : EnderecoDto){
     this.pedido.endereceDeEntrega = {id : item.id};
     this.navCtrl.push('PaymentPage', {pedido : this.pedido});
     
   }

}


