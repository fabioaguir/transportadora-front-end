import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import {NgxPaginationModule} from 'ngx-pagination';
import { TransportadoraComponent } from './transportadora/transportadora.component';
import { TransportadoraService } from './transportadora/transportadora.service';
import { CadastroComponent } from './transportadora/cadastro/cadastro.component';

@NgModule({
  declarations: [
    AppComponent,
    TransportadoraComponent,
    CadastroComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    NgxPaginationModule
  ],
  providers: [
    TransportadoraService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
