import { Component } from '@angular/core';
import { ApiPaisesService } from 'src/app/api-paises.service';
import { ResultadosService } from 'src/app/services/resultados.service';
import { SwalService } from 'src/app/services/swal.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';
import * as moment from 'moment';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.scss']
})
export class PreguntadosComponent {
  usuario: any = null;
  paises: any = [];
  preguntas: any = [];
  victoria: boolean = false;
  juegoActivo: boolean = false;
  terminado: boolean = false;
  stringResultado: string = 'Has perdido.';
  score: number = 0;
  intentos: number = 10;
  preguntaActual: any = null;
  preguntasCargadas: boolean = false;
  indiceActual: number = 0;
  respuestaCorrecta: boolean = false;
  respuestaIncorrecta: boolean = false;

  constructor(
    private apiPaises: ApiPaisesService,
    private toastService: ToastService,
    private swalService:SwalService,
    private userService:UserService,
    private firestore:ResultadosService
  ) {
  }

  async ngOnInit(){
    this.userService.user$.subscribe(user => {
      if(user)
      {
        this.usuario = user
      }
    })

    this.apiPaises.TraerPaises().subscribe((response) => {
      this.paises = response.map((pais: any) => {
        return {
          name: pais.translations.spa.official,
          flag: pais.flags.png,
        };
      });
      this.ComenzarJuego();
    });
  }

  ComenzarJuego() {
    this.generarPreguntas();
    this.preguntaActual = this.preguntas[this.indiceActual];
    this.juegoActivo = true;
  }

  generarPreguntas() {
    this.paises.sort(() => Math.random() - 0.5);
    this.preguntas = this.paises
      .slice(0, 10)
      .map((pais: any) => {
        const option2 = this.paises[this.generateRandomNumber()].name;
        const option3 = this.paises[this.generateRandomNumber()].name;
        const option4 = this.paises[this.generateRandomNumber()].name;
        const options = [pais.name, option2, option3, option4].sort(
          () => Math.random() - 0.5
        );
        return {
          answer: pais.name,
          options: options,
          flag: pais.flag,
        };
      });
    this.preguntasCargadas = true;
  }

  generateRandomNumber() {
    return Math.floor(Math.random() * 249);
  }

  play(option: string, event: Event) {
    if (this.juegoActivo) {
      const btn = <HTMLButtonElement>event.target;
      btn.disabled = true;
      if (option === this.preguntaActual.answer) {
        this.score++;
        this.respuestaCorrecta = true;
        setTimeout(() => {
          this.respuestaCorrecta = false;
        }, 300);
        this.toastService.showSuccess('Correcto.', 'Preguntados');
      } else {
        this.respuestaIncorrecta = true;
        setTimeout(() => {
          this.respuestaIncorrecta = false;
        }, 300);
        this.toastService.showError(
          `Incorrecto, la respuesta correcta era ${this.preguntaActual.answer}`,
          'Preguntados'
        );
      }

      if (this.indiceActual < 9) {
        this.indiceActual++;
        setTimeout(() => {
          this.preguntaActual = this.preguntas[this.indiceActual];
        }, 500);
      }

      if (this.intentos > 0) {
        this.intentos--;
        if (this.intentos === 0) {
          this.juegoActivo = false;
          this.terminado = true;
          if (this.score >= 4) {
            this.victoria = true;
            this.stringResultado = 'Has ganado.';
            this.swalService.MostrarExito("Felicidades, ganaste!","EXCELENTE");
          } else {
            this.toastService.showError('Has perdido.', 'Preguntados');
          }
          this.CrearResultado();
        }
      }
    }
  } 

  restartGame() {
    this.generarPreguntas();
    this.indiceActual = 0;
    this.score = 0;
    this.intentos = 10;
    this.juegoActivo = true;
    this.victoria = false;
    this.terminado = false;
    this.stringResultado = 'Has perdido.';
    this.preguntaActual = this.preguntas[this.indiceActual];
    this.toastService.showInfo('Juego Reiniciado', 'Preguntados');
  } 

  CrearResultado() {
    let resultado = {
      juego:'Preguntados',
      puntaje: this.score,
      usuario: this.usuario,
      victoria:this.victoria,
      fecha:moment(new Date()).format('DD-MM-YYYY HH:mm:ss')
    }
    this.firestore.guardarResultado(resultado);
  }
}
