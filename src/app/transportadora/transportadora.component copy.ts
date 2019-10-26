/* import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Transportadora } from '../transportadora/transportadora.model';
import { TransportadoraService } from '../transportadora/transportadora.service';

@Component({
  selector: 'app-transportadora',
  templateUrl: './transportadora.component.html',
  styleUrls: ['./transportadora.component.css']
})
export class TransportadoraComponent implements OnInit {
  public transportadora: Transportadora = new Transportadora();
  public listaTransportadoras: Transportadora[] = [];
  public form: FormGroup = new FormGroup({});

  public dataModals: any[] = [];
  public dataEstados: any[] = [];

  constructor(
    private service: TransportadoraService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.iniciarFormulario();
    this.carregarListaTransportadoras();
  }

  iniciarFormulario() {
    this.iniciarDadosDoFormulario();

    this.form = this.formBuilder.group({
      email: [null, [Validators.required]],
      nome: [null, [Validators.required]],
      empresa: [null, [Validators.required]],
      telefone: [null, [Validators.required]],
      modal_id: [null, [Validators.required]],
      logradouro: [null, [Validators.required]],
      numero: [null, [Validators.required]],
      bairro: [null, [Validators.required]],
      cidade: [null, [Validators.required]],
      estado_id: [null, [Validators.required]],
      celular: [null],
      whatsapp: [null],
      cep: [null],
      termo: [null],
    });

  }

  resetarFormulario() {
    this.transportadora = new Transportadora();
    this.form.setValue({
      email: null,
      nome: null,
      empresa: null,
      telefone: null,
      modal_id: null,
      logradouro: null,
      numero: null,
      bairro: null,
      cidade: null,
      estado_id: null,
      celular: null,
      whatsapp: null,
      cep: null,
      termo: null,
    });
  }

  iniciarDadosDoFormulario() {

    this.service.getHttp().get('', this.service.getHeadrs())
      .subscribe((data: any[]) => {
        this.dataModals = data;
      });
  }

  onSubmit() {

    if (this.form.valid) {

      let formValue = Object.assign({}, this.form.value);
      let formFormated = Object.assign(formValue, {
      });

      if (this.transportadora.id) {

        this.service.update('', formFormated)
        .subscribe((transportadora: Transportadora) => {
          console.log(transportadora);
          alert('Transportadora cadastrada com sucesso!');
        }, err => {
          alert(err);
        });

      } else {

        this.service.create('', formFormated)
        .subscribe((transportadora: Transportadora) => {
          console.log(transportadora);
          alert('Transportadora atualizada com sucesso!');
        }, err => {
          alert(err);
        });

      }
    }
  }

  carregarListaTransportadoras() {
    this.service.getAll('')
      .subscribe((listaTransportadoras: Transportadora[]) => {
        this.listaTransportadoras = listaTransportadoras;
      }, err => {
        alert(err);
      });
  }

  deletarTransportadora(transportadora: Transportadora) {
    this.service.delete('', transportadora.id)
      .subscribe((listaTransportadoras: Transportadora[]) => {
        alert('Transportadora removida com sucesso!');
      }, err => {
        alert(err);
      });
  }

}
 */
