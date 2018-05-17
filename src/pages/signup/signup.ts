import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder , Validators} from '@angular/forms';
import { EstadoService } from '../../services/domain/estado.service';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoDto } from '../../models/estado.dto';
import { CidadeDto } from '../../models/cidade.dto';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  
  formGroup : FormGroup;
  estados : EstadoDto[];
  cidades : CidadeDto[];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              public estadoService: EstadoService,
              public cidadeService: CidadeService) {

    this.formGroup = this.formBuilder.group({
        nome : ['', [Validators.required, 
                    Validators.minLength(5), 
                    Validators.maxLength(120)]],

        email: ['', [Validators.required,
                    Validators.email]],

        tipo : ['', [Validators.required]],

        cpfOuCnpj: ['', [Validators.required,
                        Validators.minLength(11),
                        Validators.maxLength(14)]],

        senha: ['', [Validators.required]],

        logradouro : ['', [Validators.required]],

        numero : ['', [Validators.required]],

        complemento : ['', [] ],

        bairro : ['', [Validators.required]],

        cep : ['', [Validators.required]],

        telefone1 : ['', [Validators.required]],
        telefone2 : ['', []],
        telefone3 : ['', []],

        estadoId : [null, [Validators.required]],

        cidadeId : [null, [Validators.required]],

    });
  }

  signupUser(){
    console.log("Enviou o form");
  }

  ionViewDidLoad(){
    this.estadoService.findAll()
      .subscribe( response => {
        this.estados = response;
        //seto o valor do campo estado do formulario como sendo a primeira posição do vetor de estados
        this.formGroup.controls.estadoId.setValue(this.estados[0].id);
        this.updateCidades();
      },
      error => {});
  }

  updateCidades(){
    //pego o Id do estado que está selecionado no formulario
    let estado_id = this.formGroup.value.estadoId;

    this.cidadeService.findAll(estado_id)
      .subscribe(response => {
        this.cidades = response;
        //tiro a seleção da lista de cidades
        this.formGroup.controls.cidadeId.setValue(null);
      },
      error => {});
  }

}
