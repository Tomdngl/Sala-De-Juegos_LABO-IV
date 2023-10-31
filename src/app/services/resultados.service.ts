import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ResultadosService {

  constructor(private firestore:AngularFirestore) { }
  
  traer(nombreDeLaColeccion:string){
    return this.firestore.collection<any>(nombreDeLaColeccion).valueChanges();
  }

  guardarResultado(resultado:any)
  {
    this.firestore.collection<any>('resultadosJuegos').add(resultado);
  }

  guardarEncuesta(encuesta:any)
  {
    return this.firestore.collection<any>('encuestas').add(encuesta);
  }
}