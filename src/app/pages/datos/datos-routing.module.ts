import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultadosComponent } from './resultados/resultados.component';
import { EncuestaComponent } from './encuesta/encuesta.component';

const routes: Routes = [
  {
    path:'resultados',
    component:ResultadosComponent
  },
  {
    path:'encuesta',
    component:EncuestaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatosRoutingModule { }
