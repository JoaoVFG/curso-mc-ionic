import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartItem } from '../../models/cart-Item';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';
import { CartService } from '../../services/cart.sevice';


@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  
  items : CartItem[];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public cartService : CartService,
              public produtoService : ProdutoService) {
  }

  ionViewDidLoad() {
    let cart = this.cartService.getCart();
    this.items = cart.items;
    this.loadImageUrls();
  }
  

  loadImageUrls() {
    for (var i = 0; i < this.items.length; i++){
      let item  = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.produtoDto.id)
        .subscribe(response => {
          item.produtoDto.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.produtoDto.id}-small.jpg`;
        },
        error => {});
    }
  }
}
