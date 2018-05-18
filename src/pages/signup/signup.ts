import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder , Validators} from '@angular/forms';
import { EstadoService } from '../../services/domain/estado.service';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoDto } from '../../models/estado.dto';
import { CidadeDto } from '../../models/cidade.dto';
import { ClienteService } from '../../services/domain/cliente.service';

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
              public cidadeService: CidadeService,
              public clienteService: ClienteService,
              public alertControler:   AlertController) {

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
    this.clienteService.insert(this.formGroup.value)
      .subscribe( response =>{
        this.showInsertOk();
      },
      error => {}
      );
  }

  showInsertOk(){
    let alert = this.alertControler.create({
      title: 'Sucesso!',
      message: 'Cadastro efetuado com sucesso!',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'ok',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present(); 
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
