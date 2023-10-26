import { Component } from '@angular/core';
import { ResultadosService } from 'src/app/services/resultados.service';
import { UserService } from 'src/app/services/user.service';
import { ToastService } from 'src/app/services/toast.service';
import * as moment from 'moment';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.scss']
})
export class AhorcadoComponent {

  buttonLetters: string[] = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'Ñ',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];
  listOfWords: string[] = [
    'PERRO',
    'SERPIENTE',
    'KOALA',
    'SAPO',
    'GATO'
  ];
  usuario:any;
  victoria: boolean = false;
  juegoActivado: boolean = true;
  intentos: number = 6;
  score: number = 0;
  image: number | any = 0;
  palabra: string = '';
  seleccion: string[] = [];

  constructor(
    private toastService: ToastService,
    public userService: UserService,
    private resultados:ResultadosService) 
    { }

  ngOnInit(): void {
    this.userService.user$.subscribe(user => {
      if(user)
      {
        this.usuario = user
      }
    })
    this.palabra = this.listOfWords[Math.round(Math.random() * (this.listOfWords.length - 1))];
    this.seleccion = Array(this.palabra.length).fill('_');
  }

  restartGame() {
    this.palabra =
      this.listOfWords[
      Math.round(Math.random() * (this.listOfWords.length - 1))
      ];
    this.seleccion = Array(this.palabra.length).fill('_');
    this.juegoActivado = true;
    this.intentos = 6;
    this.score = 0;
    this.image = 0;
    this.victoria = false;
    this.resetClassBotones();
    this.toastService.showInfo('Reiniciando...', 'Ahorcado');
  } 

  resetClassBotones() {
    for (let index = 0; index < this.buttonLetters.length; index++) {
      const elemento = document.getElementById("boton" + index) as HTMLButtonElement;
      elemento?.classList.remove("btn-error");
      elemento?.classList.remove("btn-acierto");
      elemento?.classList.add("btn-letra");
      if (elemento != null) {
        elemento.disabled = false;
      }
    }
  }

  sendLetter(letter: string, idDelBoton: number) {
    let banderaLetra: boolean = false;
    let win: boolean = false;

    if (this.juegoActivado) {
      const alreadyGuessedLetterFlag: boolean = this.seleccion.some(
        (c) => c === letter
      );
      for (let i = 0; i < this.palabra.length; i++) {
        const wordLetter = this.palabra[i];
        if (wordLetter === letter && !alreadyGuessedLetterFlag) {
          this.seleccion[i] = letter;
          banderaLetra = true;
          this.score++;
          win = this.seleccion.some((hyphen) => hyphen == '_');
          if (!win) {
            this.image = this.image + '_v';
            this.juegoActivado = false;
            this.victoria = true;
            this.crearResultado();
            this.toastService.showSuccess('Has ganado.', 'Ahorcado');
            break;
          }
        }
      }

      if (!banderaLetra && !alreadyGuessedLetterFlag) {
        if (this.intentos > 0) {
          this.intentos--;
          this.image++;
          this.toastService.showError('¡Te equivocaste!', 'Ahorcado');
          const elemento = document.getElementById("boton" + idDelBoton) as HTMLButtonElement;
          elemento?.classList.remove("btn-letra");
          elemento?.classList.add("btn-error");
          if (elemento != null) {
            elemento.disabled = true;
          }
          if (this.intentos === 0) {
            this.crearResultado();
            this.toastService.showError('Has perdido.', 'Ahorcado');
            this.juegoActivado = false;
          }
        }

        if (this.score > 0) {
          this.score--;
        }
      } else if (alreadyGuessedLetterFlag) {
        this.toastService.showWarning('Esta letra ya fue utilizada.', 'Ahorcado');
      } else if (banderaLetra) {
        if (!this.victoria) {
          this.toastService.showSuccess('Correcto!', 'Ahorcado');
          const elemento = document.getElementById("boton" + idDelBoton) as HTMLButtonElement;
          elemento?.classList.remove("btn-letra");
          elemento?.classList.add("btn-acierto");
          if (elemento != null) {
            elemento.disabled = true;
          }
        }
      }
    } else {
      this.toastService.showWarning(
        '¿Quieres volver a jugar?',
        'Ahorcado', 'warning'
      );
    }
  }

  crearResultado() {
    let resultado = {
      juego:'Ahorcado',
      puntaje: this.score,
      usuario: this.usuario,
      victoria:this.victoria,
      fecha:moment(new Date()).format('DD-MM-YYYY HH:mm:ss')
    }

    this.resultados.guardarResultado(resultado);
  }

}