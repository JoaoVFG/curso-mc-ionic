import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidoDto } from '../../models/pedido.dto';
import { CartItem } from '../../models/cart-Item';
import { CartService } from '../../services/cart.sevice';
import { ClienteDto } from '../../models/cliente.dto';
import { EnderecoDto } from '../../models/endereco.dto';
import { ClienteService } from '../../services/domain/cliente.service';

@IonicPage()
@Component({
  selector: 'page-order-confirmation',
  templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage {
  
  pedido : PedidoDto;
  cartItems : CartItem[];
  cliente : ClienteDto;
  endereco : EnderecoDto;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public cartService: CartService,
              public clienteService: ClienteService) {

    this.pedido = this.navParams.get('pedido');
  }

  ionViewDidLoad() {
    this.cartItems = this.cartService.getCart().items;

    this.clienteService.findById(this.pedido.cliente.id)
      .subscribe(response => {
        this.cliente = response as ClienteDto;
        this.endereco = this.findEndereco(this.pedido.endereceDeEntrega.id, response['enderecos']);
      },
      error => {
        this.navCtrl.setRoot('homePage');
      })
  }
  
  private findEndereco(id : String, list : EnderecoDto[]) : EnderecoDto{
    let position = list.findIndex(x => x.id == id);
    return list[position];
  }

  total(){
    this.cartService.total;
  }
}
