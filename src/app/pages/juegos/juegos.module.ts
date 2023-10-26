import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalaComponent } from './sala/sala.component';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { MayorMenorComponent } from './mayor-menor/mayor-menor.component';
import { PreguntadosComponent } from './preguntados/preguntados.component';



@NgModule({
  declarations: [
    SalaComponent,
    AhorcadoComponent,
    MayorMenorComponent,
    PreguntadosComponent
  ],
  imports: [
    CommonModule
  ]
})
export class JuegosModule { }
