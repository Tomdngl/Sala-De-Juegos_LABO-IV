import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalaComponent } from './sala/sala.component';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { MayorMenorComponent } from './mayor-menor/mayor-menor.component';
import { PreguntadosComponent } from './preguntados/preguntados.component';
import { PuzzleComponent } from './puzzle/puzzle.component';
import { canActivateLogueoGuard } from 'src/app/guards/can-activate-logueo.guard';

const routes: Routes = [
  {
    path:'sala',
    component:SalaComponent
  },
  {
    path:'ahorcado',
    component:AhorcadoComponent,
    canActivate:[canActivateLogueoGuard]
  },
  {
    path:'mayor-menor',
    component:MayorMenorComponent,
    canActivate:[canActivateLogueoGuard]
  },
  {
    path:'preguntados',
    component:PreguntadosComponent,
    canActivate:[canActivateLogueoGuard]
  },
  {
    path:'puzzle',
    component:PuzzleComponent,
    canActivate:[canActivateLogueoGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
