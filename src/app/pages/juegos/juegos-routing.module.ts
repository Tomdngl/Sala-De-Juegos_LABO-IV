import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalaComponent } from './sala/sala.component';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { MayorMenorComponent } from './mayor-menor/mayor-menor.component';
import { PreguntadosComponent } from './preguntados/preguntados.component';
import { PuzzleComponent } from './puzzle/puzzle.component';

const routes: Routes = [
  {
    path:'sala',
    component:SalaComponent
  },
  {
    path:'ahorcado',
    component:AhorcadoComponent
  },
  {
    path:'mayor-menor',
    component:MayorMenorComponent
  },
  {
    path:'preguntados',
    component:PreguntadosComponent
  },
  {
    path:'puzzle',
    component:PuzzleComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
