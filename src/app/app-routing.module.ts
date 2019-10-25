import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransportadoraComponent } from './transportadora/transportadora.component';

const routes: Routes = [
  {path: 'transportadoras', component: TransportadoraComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
