import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import {NgxPaginationModule} from 'ngx-pagination';
import { TransportadoraComponent } from './transportadora/transportadora.component';
import { TransportadoraService } from './transportadora/transportadora.service';

@NgModule({
  declarations: [
    AppComponent,
    TransportadoraComponent
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
