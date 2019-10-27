import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Transportadora } from '../../transportadora/transportadora.model';
import { TransportadoraService } from '../../transportadora/transportadora.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  public transportadora: Transportadora = new Transportadora();
  public form: FormGroup = new FormGroup({});
  // Modo edit controla se o acesso a tela é para cadastro ou edição
  public modoEdit: boolean = false;

  public dataModals: any[] = [];
  public dataUFs: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: TransportadoraService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.iniciarFormulario();
    this.route.params.subscribe((parametros: Params) => {
      if (parametros.id) {
        this.modoEdit = true;

        this.service.findById(parametros.id).subscribe((transportadora: Transportadora) => {
          this.edit(transportadora);
        }, erro => {
          alert(erro);
        });
      } else {
        this.modoEdit = false;
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
      termo: [false],
    });
  }

  resetarFormulario() {
    this.transportadora = new Transportadora();
    this.form.setValue({
      email: null,
      nome: null,
      empresa: null,
      cnpj: null,
      telefone: null,
      modalId: null,
      logradouro: null,
      numero: null,
      bairro: null,
      cidade: null,
      ufId: null,
      celular: null,
      whatsapp: null,
      cep: null,
      termo: null,
    });
  }

  iniciarDadosDoFormulario() {
    const routeModal = environment.api + 'modal';
    this.service.getHttp().get(routeModal, this.service.getHeadrs())
      .subscribe((data: any[]) => {
        this.dataModals = data;
      });

    const routeUF = environment.api + 'uf';
    this.service.getHttp().get(routeUF, this.service.getHeadrs())
      .subscribe((data: any[]) => {
        this.dataUFs = data;
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
      let formValue = Object.assign({}, this.form.value);
      // let formFormated = Object.assign(formValue, {
      //   termo : this.transportadora ? true : false
      // });

      // valida se a operação será para create ou update da transportadora
      if (this.transportadora.id) {
        formValue = Object.assign({}, this.transportadora);
        this.service.update(formValue)
          .subscribe((transportadora: Transportadora) => {
            alert('Transportadora atualizada com sucesso!');
            this.router.navigate(['/transportadoras']);
          }, err => {
            alert(err);
          });
      } else {
        formValue.termo = this.transportadora.termo ? true : false;
        this.service.create(formValue)
          .subscribe((response: any) => {
            alert('Transportadora cadastrada com sucesso!');
            this.router.navigate(['/transportadoras']);
          }, err => {
            alert(err);
          });
      }
    }
  }

  deletar(transportadora: Transportadora) {
    this.service.delete(transportadora.id)
      .subscribe((resposta: any) => {
        alert('Transportadora removida com sucesso!');
        this.router.navigate(['/transportadoras']);
      }, err => {
        alert(err);
      });
  }
}
