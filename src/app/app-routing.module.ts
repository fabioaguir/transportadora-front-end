import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransportadoraComponent } from './transportadora/transportadora.component';
import { CadastroComponent } from './transportadora/cadastro/cadastro.component';

const routes: Routes = [
  {path: 'transportadoras', component: TransportadoraComponent},
  {path: 'cadastrarTransportadora', component: CadastroComponent},
  {path: 'atualizarTransportadora/:id', component: CadastroComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
