import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidoDto } from '../../models/pedido.dto';
import { CartItem } from '../../models/cart-Item';
import { CartService } from '../../services/cart.sevice';
import { ClienteDto } from '../../models/cliente.dto';
import { EnderecoDto } from '../../models/endereco.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { PedidoService } from '../../services/domain/pedido.service';

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
              public clienteService: ClienteService,
              public pedidoService : PedidoService) {

    this.pedido = this.navParams.get('pedido');
  }

  ionViewDidLoad() {
    this.cartItems = this.cartService.getCart().items;

    this.clienteService.findById(this.pedido.cliente.id)
      .subscribe(response => {
        this.cliente = response as ClienteDto;
        this.endereco = this.findEndereco(this.pedido.enderecoDeEntrega.id, response['enderecos']);
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
    this.cartService.total();
  }

  checkout(){
    console.log(this.pedido.enderecoDeEntrega);
    
    this.pedidoService.insert(this.pedido)
      .subscribe(response =>{
        this.cartService.createOrClearCart();
        console.log(response.headers.get('location'));
      },
      error =>{
        if(error.status == 403){
          this.navCtrl.setRoot('HomePage');
        }
      })
  }

  back(){
    this.navCtrl.setRoot('CartPage');
  }
}
