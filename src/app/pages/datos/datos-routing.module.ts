import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultadosComponent } from './resultados/resultados.component';
import { EncuestaComponent } from './encuesta/encuesta.component';
import { RespuestasEncuestaComponent } from './respuestas-encuesta/respuestas-encuesta.component';
import { canActivateAdminGuard } from 'src/app/guards/can-activate-admin.guard';

const routes: Routes = [
  {
    path:'resultados',
    component:ResultadosComponent
  },
  {
    path:'encuesta',
    component:EncuestaComponent
  },
  {
    path:'respuestas-encuesta',
    component:RespuestasEncuestaComponent,
    canActivate:[canActivateAdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatosRoutingModule { }
