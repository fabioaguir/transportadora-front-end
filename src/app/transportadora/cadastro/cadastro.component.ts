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
  private sizeFile = 2097152;
  private formatFile = [
    'image/jpeg',
    'image/png'
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: TransportadoraService,
    private formBuilder: FormBuilder,
    private viacep: NgxViacepService
  ) { }

  ngOnInit() {
    this.initForm();
    this.route.params.subscribe((params: Params) => {
      if (params.id) {
        this.modoEdit = true;
        this.form.get('termo').setValidators(Validators.nullValidator);

        this.service.findById(params.id).subscribe((transportadora: Transportadora) => {
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

  initForm() {
    this.initDataForm();

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

  initDataForm() {
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

  onSave() {
    if (this.form.valid) {
      const formValue = Object.assign({}, this.form.value);

      // valida se a operação será para create ou update da transportadora
      if (this.transportadora.id) {
        const formFormated = Object.assign(formValue, {
          id : this.transportadora.id,
          termo: this.transportadora.termo,
          logo: formValue.logo ? formValue.logo : this.transportadora.logo
        });

        this.service.update(formFormated)
          .subscribe((response: any) => {
            alert('Transportadora atualizada com sucesso!');
            this.router.navigate(['/transportadoras']);
          }, error => {
            alert(error.error);
          });
      } else {
        const formFormated = Object.assign(formValue, {
          termo: this.transportadora.termo ? true : false,
        });

        this.service.create(formFormated)
          .subscribe((response: any) => {
            alert('Transportadora cadastrada com sucesso!');
            this.router.navigate(['/transportadoras']);
          }, error => {
            alert(error.error);
          });
      }
    }
  }

  onDelete(transportadora: Transportadora) {
    this.service.delete(transportadora.id)
      .subscribe((response: any) => {
        alert('Transportadora removida com sucesso!');
        this.router.navigate(['/transportadoras']);
      }, error => {
        alert(error.error);
      });
  }

  onSearchCep(event: any) {
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

  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];

    if (!this.formatFile.find(item => item === this.selectedFile.type)) {
      alert('Tipo de arquivo não permitido!');
      return;
    }

    if (this.sizeFile < this.selectedFile.size) {
      alert('Tamanho do arquivo ultrapassa limite permitido de 2MB!');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = (event2) => {
      this.form.get('logo').setValue(reader.result);
      this.imgURL = reader.result;
    };
  }

}
