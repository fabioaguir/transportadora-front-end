import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Transportadora } from '../transportadora/transportadora.model';
import { TransportadoraService } from '../transportadora/transportadora.service';
import { environment } from 'src/environments/environment';

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
  public resultadosDoFiltro: number = 0;
  public listaUfSelecionadas: any[] = [];
  public listaModalSelecionadas: any[] = [];
  public nomeParaPesquisa: string = null;
  public municipioParaPesquisa: string = null;

  constructor(
    private service: TransportadoraService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.iniciarFormulario();
    this.filtro();
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

  iniciarDadosDoFormulario() {
    const routeModal = environment.api + 'modal/searchForParamsFilter';
    this.service.getHttp().get(routeModal, this.service.getHeadrs())
      .subscribe((data: any[]) => {
        this.dataModals = data;
      });

    const routeUF = environment.api + 'uf/searchForParamsFilter';
    this.service.getHttp().get(routeUF, this.service.getHeadrs())
      .subscribe((data: any[]) => {
        this.dataUFs = data;
      });
  }

  onSubmit() {
    const formValue = Object.assign({}, this.form.value);

    this.service.update(formValue)
      .subscribe((transportadora: Transportadora) => {
        console.log(transportadora);
        alert('Transportadora cadastrada com sucesso!');
      }, err => {
        alert(err);
      });
  }

  filtro() {
    try {
      const parametros = this.parametrosDaPesquisa();
      this.service.search(parametros)
        .subscribe((listaTransportadoras: Transportadora[]) => {
          this.listaTransportadoras = listaTransportadoras.slice();
          this.resultadosDoFiltro = this.listaTransportadoras.length;
        }, err => {
          alert(err);
        });
    } catch (erro) {
      alert(erro);
    }
  }

  parametrosDaPesquisa() {
    const ufs = this.listaUfSelecionadas.map(item => item.id).join(',');
    const modals = this.listaModalSelecionadas.map(item => item.id).join(',');
    const nome = this.nomeParaPesquisa ? this.nomeParaPesquisa : '';
    const municipio = this.municipioParaPesquisa ? this.municipioParaPesquisa : '';

    if (ufs || modals || nome || municipio) {
      const parametros = '/?nome=' + nome + '&cidade=' + municipio + '&ufs=' + ufs + '&modals=' + modals;
      return parametros;
    } else {
      return '';
    }

  }

  selecionarUfParaFiltro(uf: any) {
    const filter = this.listaUfSelecionadas.filter(item => item.id === uf.id)[0];
    if (!filter) {
      this.listaUfSelecionadas.push(uf);
      this.listaUfSelecionadas = this.listaUfSelecionadas.slice();
      this.filtro();
    }
  }

  removerUfDoFiltro(uf: any) {
    const filter = this.listaUfSelecionadas.filter(item => item.id === uf.id)[0];
    this.listaUfSelecionadas.splice(this.listaUfSelecionadas.indexOf(filter), 1);
    this.listaUfSelecionadas = this.listaUfSelecionadas.slice();
    this.filtro();
  }

  selecionarModalParaFiltro(modal: any) {
    const filter = this.listaModalSelecionadas.filter(item => item.id === modal.id)[0];
    if (!filter) {
      this.listaModalSelecionadas.push(modal);
      this.listaModalSelecionadas = this.listaModalSelecionadas.slice();
      this.filtro();
    }
  }

  removerModalDoFiltro(modal: any) {
    const filter = this.listaModalSelecionadas.filter(item => item.id === modal.id)[0];
    this.listaModalSelecionadas.splice(this.listaModalSelecionadas.indexOf(filter), 1);
    this.listaModalSelecionadas = this.listaModalSelecionadas.slice();
    this.filtro();
  }

  pesquisarPorNome(event: any) {
    this.nomeParaPesquisa = event.target.value;
    this.filtro();
  }

  removerNomeDaPesquisa(event: any) {
    this.nomeParaPesquisa = null;
    this.filtro();
  }

  pesquisarPorMunicipio(event: any) {
    this.municipioParaPesquisa = event.target.value;
    this.filtro();
  }

  removerMunicipioDaPesquisa(event: any) {
    this.municipioParaPesquisa = null;
    this.filtro();
  }
}
