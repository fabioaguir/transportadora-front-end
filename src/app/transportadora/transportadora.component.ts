import { Component, OnInit } from '@angular/core';
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

  public dataModals: any[] = [];
  public dataUFs: any[] = [];

  public resultadosDoFiltro: number = 0;
  public listaUfSelecionadas: any[] = [];
  public listaModalSelecionadas: any[] = [];
  public nomeParaPesquisa: string = null;
  public municipioParaPesquisa: string = null;
  public paginaAtual = 1;

  constructor(
    private service: TransportadoraService
  ) { }

  ngOnInit() {
    this.initDataFilter();
    this.search();
  }

  initDataFilter() {
    const routeModal = environment.api + 'modal/searchForParamsFilter';
    this.service.getHttp().get(routeModal, this.service.getHeadrs())
      .subscribe((modals: any[]) => {
        this.dataModals = modals;
      });

    const routeUF = environment.api + 'uf/searchForParamsFilter';
    this.service.getHttp().get(routeUF, this.service.getHeadrs())
      .subscribe((ufs: any[]) => {
        this.dataUFs = ufs;
      });
  }

  search() {
    const params = this.paramsUrlForSearch();
    this.service.search(params)
      .subscribe((listaTransportadoras: Transportadora[]) => {
        this.listaTransportadoras = listaTransportadoras.slice();
        this.resultadosDoFiltro = this.listaTransportadoras.length;
      }, error => {
        alert(error.error);
      });
  }

  private paramsUrlForSearch() {
    const ufs = this.listaUfSelecionadas.map(item => item.id).join(',');
    const modals = this.listaModalSelecionadas.map(item => item.id).join(',');
    const nome = this.nomeParaPesquisa ? encodeURIComponent(this.nomeParaPesquisa) : '';
    const municipio = this.municipioParaPesquisa ? encodeURIComponent(this.municipioParaPesquisa) : '';

    if (ufs || modals || nome || municipio) {
      const params = '/?nome=' + nome + '&cidade=' + municipio + '&ufs=' + ufs + '&modals=' + modals;
      return params;
    } else {
      return '';
    }
  }

  onAddUfForFilter(uf: any) {
    const filter = this.listaUfSelecionadas.filter(item => item.id === uf.id)[0];
    if (!filter) {
      this.listaUfSelecionadas.push(uf);
      this.listaUfSelecionadas = this.listaUfSelecionadas.slice();
      this.search();
    }
  }

  onRemoveUfFilter(uf: any) {
    const filter = this.listaUfSelecionadas.filter(item => item.id === uf.id)[0];
    this.listaUfSelecionadas.splice(this.listaUfSelecionadas.indexOf(filter), 1);
    this.listaUfSelecionadas = this.listaUfSelecionadas.slice();
    this.search();
  }

  onAddModalForFilter(modal: any) {
    const filter = this.listaModalSelecionadas.filter(item => item.id === modal.id)[0];
    if (!filter) {
      this.listaModalSelecionadas.push(modal);
      this.listaModalSelecionadas = this.listaModalSelecionadas.slice();
      this.search();
    }
  }

  onRemoveModalFilter(modal: any) {
    const filter = this.listaModalSelecionadas.filter(item => item.id === modal.id)[0];
    this.listaModalSelecionadas.splice(this.listaModalSelecionadas.indexOf(filter), 1);
    this.listaModalSelecionadas = this.listaModalSelecionadas.slice();
    this.search();
  }

  onAddNomeFilter(event: any) {
    this.nomeParaPesquisa = event.target.value;
    this.search();
  }

  onRemoveNomeFilter(event: any) {
    this.nomeParaPesquisa = null;
    this.search();
  }

  onAddMunicipioFilter(event: any) {
    this.municipioParaPesquisa = event.target.value;
    this.search();
  }

  onRemoveMunicipioFilter(event: any) {
    this.municipioParaPesquisa = null;
    this.search();
  }

}
