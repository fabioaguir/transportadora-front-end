import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgxViacepModule } from '@brunoc/ngx-viacep';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown-angular7';

import { TransportadoraComponent } from './transportadora/transportadora.component';
import { TransportadoraService } from './transportadora/transportadora.service';
import { CadastroComponent } from './transportadora/cadastro/cadastro.component';
import { TelefonePipe } from './pipes/telefone.pipe';
import { CnpjPipe } from './pipes/cnpj.pipe';
@NgModule({
  declarations: [
    AppComponent,
    TransportadoraComponent,
    CadastroComponent,
    TelefonePipe,
    CnpjPipe
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    NgxPaginationModule,
    NgxViacepModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [
    TransportadoraService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
