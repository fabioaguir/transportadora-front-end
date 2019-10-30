import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Transportadora } from '../../transportadora/transportadora.model';
import { TransportadoraService } from '../../transportadora/transportadora.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { NgxViacepService, ErroCep, Endereco } from '@brunoc/ngx-viacep';
import { ExceptionSearchCep } from 'src/app/exceptions/exception-search-cep';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  public transportadora: Transportadora = new Transportadora();
  public form: FormGroup = new FormGroup({});
  // Variável modoEdit controla se o acesso a tela é para cadastro ou edição
  public modoEdit: boolean = false;

  public dataModals: any[] = [];
  public dataUFs: any[] = [];

  public selectedFile;
  public imgURL: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: TransportadoraService,
    private formBuilder: FormBuilder,
    private viacep: NgxViacepService
  ) { }

  ngOnInit() {
    this.iniciarFormulario();
    this.route.params.subscribe((parametros: Params) => {
      if (parametros.id) {
        this.modoEdit = true;
        this.form.get('termo').setValidators(Validators.nullValidator);

        this.service.findById(parametros.id).subscribe((transportadora: Transportadora) => {
          this.edit(transportadora);
        }, error => {
          alert(error.error.message);
        });
      } else {
        this.modoEdit = false;
        this.form.get('termo').setValidators(Validators.required);
      }
    });
  }

  iniciarFormulario() {
    this.iniciarDadosDoFormulario();

    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      nome: [null, [Validators.required]],
      empresa: [null, [Validators.required, Validators.minLength(4)]],
      cnpj: [null, [Validators.required]],
      telefone: [null, [Validators.required]],
      modalId: [null, [Validators.required]],
      logradouro: [null, [Validators.required]],
      numero: [null, [Validators.required]],
      bairro: [null, [Validators.required]],
      cidade: [null, [Validators.required]],
      ufId: [null, [Validators.required]],
      celular: [null],
      whatsapp: [null],
      cep: [null],
      termo: [null],
      logo: [null],
    });
  }

  iniciarDadosDoFormulario() {
    const routeModal = environment.api + 'modal';
    this.service.getHttp().get(routeModal, this.service.getHeadrs())
      .subscribe((modals: any[]) => {
        this.dataModals = modals;
      });

    const routeUF = environment.api + 'uf';
    this.service.getHttp().get(routeUF, this.service.getHeadrs())
      .subscribe((ufs: any[]) => {
        this.dataUFs = ufs;
      });
  }

  edit(transportadora: Transportadora) {
    this.transportadora = Object.assign({}, transportadora);

    if (this.transportadora.modal.id) {
      this.form.get('modalId').setValue(this.transportadora.modal.id);
    }

    if (this.transportadora.uf.id) {
      this.form.get('ufId').setValue(this.transportadora.uf.id);
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const formValue = Object.assign({}, this.form.value);

      // valida se a operação será para create ou update da transportadora
      if (this.transportadora.id) {
        formValue.id = this.transportadora.id;
        formValue.termo = this.transportadora.termo;
        formValue.logo = formValue.logo ? formValue.logo : this.transportadora.logo;

        this.service.update(formValue)
          .subscribe((response: any) => {
            alert('Transportadora atualizada com sucesso!');
            this.router.navigate(['/transportadoras']);
          }, error => {
            alert(error.error);
          });
      } else {
        formValue.termo = this.transportadora.termo ? true : false;
        this.service.create(formValue)
          .subscribe((response: any) => {
            alert('Transportadora cadastrada com sucesso!');
            this.router.navigate(['/transportadoras']);
          }, error => {
            alert(error.error);
          });
      }
    }
  }

  deletar(transportadora: Transportadora) {
    this.service.delete(transportadora.id)
      .subscribe((response: any) => {
        alert('Transportadora removida com sucesso!');
        this.router.navigate(['/transportadoras']);
      }, error => {
        alert(error.error);
      });
  }

  buscarCep(event: any) {
    const cep = event.target.value;
    this.viacep.buscarPorCep(cep).then((endereco: Endereco) => {
      this.form.get('cidade').setValue(endereco.localidade);
      this.form.get('bairro').setValue(endereco.bairro);
      this.form.get('logradouro').setValue(endereco.logradouro);

      const uf = this.dataUFs.filter(item => item.sigla === endereco.uf)[0];
      this.form.get('ufId').setValue(uf.id);
    }).catch((error: ErroCep) => {
      ExceptionSearchCep.exceptions(error);
    });
  }

  public onFileChanged(event) {
    this.selectedFile = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => {
      this.form.get('logo').setValue(reader.result);
      this.imgURL = reader.result;
    };
  }

}
