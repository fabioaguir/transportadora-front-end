import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
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
  public dataUFs: any[] = [];

  constructor(
    private service: TransportadoraService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.iniciarFormulario();
    //this.carregarListaTransportadoras();
  }

  iniciarFormulario() {
    this.iniciarDadosDoFormulario();

    this.form = this.formBuilder.group({
      nome: [null],
      uf: [null],
      cidade: [null],
      modal: [null],
    });

  }

  resetarFormulario() {
    this.transportadora = new Transportadora();
    this.form.setValue({
      nome: null,
      uf: null,
      cidade: null,
      modal: null,
    });
  }

  iniciarDadosDoFormulario() {

    this.service.getHttp().get('', this.service.getHeadrs())
      .subscribe((data: any[]) => {
        this.dataModals = data;
      });
  }

  onSubmit() {
    const formValue = Object.assign({}, this.form.value);

    this.service.update('', formValue)
      .subscribe((transportadora: Transportadora) => {
        console.log(transportadora);
        alert('Transportadora cadastrada com sucesso!');
      }, err => {
        alert(err);
      });
  }

  carregarListaTransportadoras() {
    this.service.getAll('')
      .subscribe((listaTransportadoras: Transportadora[]) => {
        this.listaTransportadoras = listaTransportadoras;
      }, err => {
        alert(err);
      });
  }

}
