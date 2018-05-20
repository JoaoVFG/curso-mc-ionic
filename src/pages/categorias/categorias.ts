import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaService } from '../../services/domain/categoria.service';
import { CategoriaDto } from "../../models/categoria.dto";
import { API_CONFIG } from "../../config/api.config";

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  bucketUrl : string = API_CONFIG.bucketBaseUrl;
  items : CategoriaDto[];

  constructor(public navCtrl: NavController, 
  			  public navParams: NavParams,
  			  public categoriaService: CategoriaService ) {
  }


  ionViewDidLoad() {
    
  	this.categoriaService.findAll()
  		.subscribe(response => {
  			this.items = response;
  		},
  		error => {}
      );
  }
  
  showProdutos(categoria_id : string){
    //para passar atributos para outra pagina - inlcui parametro no metodo -  
    //passo como objeto {[nome do atributo] : [valor do atributo]}
    this.navCtrl.push('ProdutosPage', {categoria_id : categoria_id});
  }
}
