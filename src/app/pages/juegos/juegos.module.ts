import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JuegosRoutingModule } from './juegos-routing.module';
import { SalaComponent } from './sala/sala.component';
import { PreguntadosComponent } from './preguntados/preguntados.component';
import { MayorMenorComponent } from './mayor-menor/mayor-menor.component';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { PuzzleComponent } from './puzzle/puzzle.component';


@NgModule({
  declarations: [
    SalaComponent,
    PreguntadosComponent,
    MayorMenorComponent,
    AhorcadoComponent,
    PuzzleComponent
  ],
  imports: [
    CommonModule,
    JuegosRoutingModule
  ]
})
export class JuegosModule { }
