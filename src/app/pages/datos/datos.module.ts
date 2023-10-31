import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatosRoutingModule } from './datos-routing.module';
import { ResultadosComponent } from './resultados/resultados.component';
import { EncuestaComponent } from './encuesta/encuesta.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ResultadosComponent,
    EncuestaComponent
  ],
  imports: [
    CommonModule,
    DatosRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DatosModule { }
