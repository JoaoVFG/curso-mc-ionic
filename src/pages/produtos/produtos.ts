import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDto } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {
  
  items : ProdutoDto[];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    
    let categoria_Id = this.navParams.get('categoria_id');

    this.produtoService.findByCategoria(categoria_Id)
      .subscribe(response =>{
        console.log(response);
        console.log(response['content']);
        
        
        this.items = response['content'];
      },
      error => {});

  }

}
