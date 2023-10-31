import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SwalService } from 'src/app/services/swal.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ResultadosService } from 'src/app/services/resultados.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.scss']
})
export class EncuestaComponent implements OnInit {
  formEncuesta: FormGroup;
  usuario: any;
  nuevaCategoria:string | boolean;


  constructor(private userService: UserService, private resultados: ResultadosService, private formBuilder: FormBuilder, private swal: SwalService, private router: Router){ 
    this.formEncuesta = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      edad: ['', [Validators.required, Validators.min(12), Validators.max(99)]],
      telefono: ['',[Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]*$')]],
      nuevaCategoriaRpg: [true],
      nuevaCategoriaPlataformas: [false],
      nuevaCategoriaEstrategia: [false],
      nuevaCategoriaOtros: [false],
      juegoFavorito:['simon'],
      comentario:['',[Validators.required,Validators.minLength(3),Validators.maxLength(200)]]
    });

    this.nuevaCategoria = false;
  }

  ngOnInit(): void {
    this.userService.user$.subscribe((user: any) => {
      if (user) {
        this.usuario = user;
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  EnviarEncuesta() {
    if (this.formEncuesta.valid) {
      if (this.ValdidaCategoria()) {
        this.GuardarEncuesta();
        this.formEncuesta.reset({
          nombre: '',
          edad: '',
          telefono: '',
          juegoFavorito: 'simon',
          comentario: '',
        });
      } else {
        this.MostrarMensajeValidacionJuegos();
        this.swal.Error("Error","Debe completar todos los campos antes de enviar la encuesta.");
      }
    } else {
      this.MostrarMensajeValidacionJuegos();
      this.swal.Error("Error","Debe completar todos los campos antes de enviar la encuesta.");
    }
  }

  ReiniciarForm()
  {
    this.formEncuesta.reset({
      nombre: '',
      edad: '',
      telefono: '',
      juegoFavorito: 'simon',
    });
  }

  MostrarMensajeValidacionJuegos() {
    const rpg = this.formEncuesta.value.nuevaCategoriaRpg;
    const plataformas = this.formEncuesta.value.nuevaCategoriaPlataformas;
    const estrategia = this.formEncuesta.value.nuevaCategoriaEstrategia;
    const otros = this.formEncuesta.value.nuevaCategoriaOtros;

    if (!rpg && !plataformas && !estrategia && !otros) {
      this.nuevaCategoria = 'Se debe elegir al menos una opción';
    } else {
      this.nuevaCategoria = false;
    }
  }

  ValdidaCategoria(): boolean {
    const rpg = this.formEncuesta.value.nuevaCategoriaRpg;
    const plataformas = this.formEncuesta.value.nuevaCategoriaPlataformas;
    const estrategia = this.formEncuesta.value.nuevaCategoriaEstrategia;
    const otros = this.formEncuesta.value.nuevaCategoriaOtros;

    if (!rpg && !plataformas && !estrategia && !otros) {
      return false;
    }
    return true;
  }

  GuardarEncuesta() {
    const encuesta = {
      usuario: this.usuario,
      fecha: moment(new Date()).format('DD-MM-YYYY'),
      encuesta: this.formEncuesta.value,
    };

    this.resultados.guardarEncuesta(encuesta).then(() => {
      this.swal.Exito("Exito","La encuesta se ha enviado correctamente, gracias por tu tiempo.")
    }).catch(() => {
      this.swal.Error("Error","Ha ocurrido un error inesperado al enviar la encuesta, intentalo nuevamente mas tarde.")
    })
  }
}