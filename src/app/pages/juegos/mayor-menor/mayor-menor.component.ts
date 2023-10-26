import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { SwalService } from 'src/app/services/swal.service';
import * as moment from 'moment';
import { ToastService } from 'src/app/services/toast.service';
import { ResultadosService } from 'src/app/services/resultados.service';

@Component({
  selector: 'app-mayor-menor',
  templateUrl: './mayor-menor.component.html',
  styleUrls: ['./mayor-menor.component.scss']
})
export class MayorMenorComponent {
  usuario: any = null;
  startButtonText: string = 'Comenzar Juego';
  victoria: boolean = false;
  activo: boolean = false;
  terminado: boolean = false;
  stringResultado: string = 'Perdiste.';
  imagenCartaActual: string = '/assets/mayor-menor/blanca.png';
  cardList: any = [
    { palo: 'clubs', numero: 1 },
    { palo: 'clubs', numero: 2 },
    { palo: 'clubs', numero: 3 },
    { palo: 'clubs', numero: 4 },
    { palo: 'clubs', numero: 5 },
    { palo: 'clubs', numero: 6 },
    { palo: 'clubs', numero: 7 },
    { palo: 'clubs', numero: 8 },
    { palo: 'clubs', numero: 9 },
    { palo: 'clubs', numero: 10 },
    { palo: 'clubs', numero: 11 },
    { palo: 'clubs', numero: 12 },
    { palo: 'clubs', numero: 13 },
    { palo: 'diamonds', numero: 1 },
    { palo: 'diamonds', numero: 2 },
    { palo: 'diamonds', numero: 3 },
    { palo: 'diamonds', numero: 4 },
    { palo: 'diamonds', numero: 5 },
    { palo: 'diamonds', numero: 6 },
    { palo: 'diamonds', numero: 7 },
    { palo: 'diamonds', numero: 8 },
    { palo: 'diamonds', numero: 9 },
    { palo: 'diamonds', numero: 10 },
    { palo: 'diamonds', numero: 11 },
    { palo: 'diamonds', numero: 12 },
    { palo: 'diamonds', numero: 13 },
    { palo: 'hearts', numero: 1 },
    { palo: 'hearts', numero: 2 },
    { palo: 'hearts', numero: 3 },
    { palo: 'hearts', numero: 4 },
    { palo: 'hearts', numero: 5 },
    { palo: 'hearts', numero: 6 },
    { palo: 'hearts', numero: 7 },
    { palo: 'hearts', numero: 8 },
    { palo: 'hearts', numero: 9 },
    { palo: 'hearts', numero: 10 },
    { palo: 'hearts', numero: 11 },
    { palo: 'hearts', numero: 12 },
    { palo: 'hearts', numero: 13 },
    { palo: 'spades', numero: 1 },
    { palo: 'spades', numero: 2 },
    { palo: 'spades', numero: 3 },
    { palo: 'spades', numero: 4 },
    { palo: 'spades', numero: 5 },
    { palo: 'spades', numero: 6 },
    { palo: 'spades', numero: 7 },
    { palo: 'spades', numero: 8 },
    { palo: 'spades', numero: 9 },
    { palo: 'spades', numero: 10 },
    { palo: 'spades', numero: 11 },
    { palo: 'spades', numero: 12 },
    { palo: 'spades', numero: 13 },
  ];
  cartas: any = [];
  score: number = 0;
  intentos: number = 10;
  cartaActual: any = null;
  numActual: number = 0;
  actualIndex: number = 0;

  constructor(
    private toastService: ToastService,
    public loginService: UserService,
    private swalService: SwalService,
    private resultados: ResultadosService
  ) { }

  ngOnInit(): void {

  }

  startGame() {
    this.intentos = 10;
    this.victoria = false;
    this.activo = true;
    this.terminado = false;
    this.stringResultado = 'Perdiste.';
    this.score = 0;
    this.actualIndex = 0;
    this.startButtonText = 'Reiniciar Juego';
    this.cardList.sort(() => Math.random() - 0.5);
    this.cartas = this.cardList.slice(0, 11);
    this.cartaActual = this.cartas[this.actualIndex];
    this.numActual = this.cartaActual.numero;
    this.imagenCartaActual = `/assets/mayor-menor/${this.cartaActual.palo}_${this.cartaActual.numero}.png`;
  }

  playMayorMenor(mayorMenor: string) {
    const anteriorNumero: number = this.numActual;
    this.actualIndex++;
    this.intentos--;
    this.cartaActual = this.cartas[this.actualIndex];
    this.numActual = this.cartaActual.numero;
    this.imagenCartaActual = `/assets/mayor-menor/${this.cartaActual.palo}_${this.cartaActual.numero}.png`;

    switch (mayorMenor) {
      case 'menor':
        if (anteriorNumero > this.numActual) {
          this.score++;
          this.toastService.showSuccess('Acertaste, la carta es menor.', 'Mayor o Menor');
        } else if (anteriorNumero === this.numActual) {
          this.intentos++;
          this.toastService.showInfo('Las cartas son iguales', 'Mayor o Menor');
        } else {
          this.toastService.showError('No acertaste', 'Mayor o Menor');
        }
        break;
      case 'mayor':
        if (anteriorNumero < this.numActual) {
          this.score++;
          this.toastService.showSuccess('Acertaste, la carta es mayor.', 'Mayor o Menor');
        } else if (anteriorNumero === this.numActual) {
          this.intentos++;
          this.toastService.showInfo('Las cartas son iguales', 'Mayor o Menor');
        } else {
          this.toastService.showError('No acertaste', 'Mayor o Menor');
        }
        break;
    }

    if (this.actualIndex === 10) {
      this.activo = false;
      this.terminado = true;
      if (this.score >= 5) {
        this.victoria = true;
        this.stringResultado = 'Ganaste.';
        this.swalService.MostrarExito("Has ganado", "!Felicidades!");
      } else {
        this.swalService.MostrarError("Perdiste", "!Mejor suerte la próxima!");
      }
      this.CrearResultado();
    }
  }

  CrearResultado() {
    let resultado = {
      juego: 'MayorMenor',
      puntaje: this.score,
      usuario: this.usuario,
      victoria: this.victoria,
      fecha: moment(new Date()).format('DD-MM-YYYY HH:mm:ss')
    }

    this.resultados.guardarResultado(resultado);
  }
}
