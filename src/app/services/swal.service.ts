import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwalService {

  constructor() { }

  MostrarError(titulo:string,mensaje:string)
  {
    return Swal.fire({
      title: titulo,
      text: mensaje,
      icon:"error",
    })
  }

  MostrarExito(titulo:string,mensaje:string)
  {
    return Swal.fire({
      title: titulo,
      text: mensaje,
      icon:"success",
      showConfirmButton: false,
      timer:2000
    })
  }

  MostrarConfirmacion(titulo:string,mensaje:string)
  {
    return Swal.fire({
      title: titulo,
      text: mensaje,
      showCancelButton: true,
      confirmButtonText: 'Salir',
      confirmButtonColor: "red",
      cancelButtonText:"Cancelar",
      cancelButtonColor:"blue",
      icon:"question"
    })
  }
}