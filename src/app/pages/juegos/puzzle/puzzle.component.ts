import { Component } from '@angular/core';
import { ResultadosService } from 'src/app/services/resultados.service';
import { SwalService } from 'src/app/services/swal.service';
import { ToastService } from 'src/app/services/toast.service';
import * as moment from 'moment';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.scss']
})
export class PuzzleComponent {
  usuario: any = null;
  pattern: number[] = [];
  patronUsuario: number[] = [];
  victoria: boolean = false;
  isGameOn: boolean = false;
  isUserTurn: boolean = false;
  isGameOver: boolean = false;
  perdio: boolean = false;
  level: number = 1;
  colorActivo: number | null = null;

  private audioContext: AudioContext | null = null;

  constructor(
    private swalService: SwalService, 
    private toastService: ToastService,
    private firestore: ResultadosService,
    private userService: UserService
    ){
    }

  ngOnInit(): void {
    this.userService.user$.subscribe(user => {
      if(user)
      {
        this.usuario = user
      }
    })
  }

  startGame() {
    this.resetearJuego();
    this.audioContext = new AudioContext();
    this.generarPatron();
    this.jugarPatron();
  }

  restartGame() {
    this.resetearJuego();
    this.level = 1;
    this.generarPatron();
    this.jugarPatron();
  }

  resetearJuego() {
    this.pattern = [];
    this.patronUsuario = [];
    this.isGameOn = true;
    this.isGameOver = false;
    this.colorActivo = null;
    this.perdio = false;
  }

  generarPatron() {
    if (this.level != 1) {
      this.toastService.showSuccess('Correcto.', 'Simon');
    }
    this.pattern = Array.from({ length: this.level }, () => Math.floor(Math.random() * 4) + 1);
  }

  jugarPatron() {
    let index = 0;
    const colors = [null, 1, 2, 3, 4];

    const playNextColor = () => {
      if (index < this.pattern.length) {
        const colorAJugar = this.pattern[index];
        this.reproducirSonido(colorAJugar);
        this.colorActivo = colorAJugar;
        this.patronUsuario.push(colorAJugar);

        console.log(`Color activado: ${colorAJugar}`);

        setTimeout(() => {
          this.colorActivo = null;
          this.patronUsuario.pop();
          index++;
          playNextColor();
        }, 1000);
      } else {
        this.isUserTurn = true;
      }
    };

    playNextColor();
  }


  handleUserInput(color: number) {
    if (this.isUserTurn) {
      this.reproducirSonido(color);
      this.patronUsuario.push(color);

      if (color !== this.pattern[this.patronUsuario.length - 1]) {
        this.patronUsuario = [];
        this.isUserTurn = false;
        this.isGameOver = true;
        this.perdio = true;
        this.swalService.Error("Que pena", "Has perdido.")
        this.CrearResultado();
      } else if (this.patronUsuario.length === this.pattern.length) {
        if (this.level === 5) {
          this.victoria = true; 
          this.swalService.Exito("Felicitaciones", "Has ganado");
          this.CrearResultado();
        } else {
          this.level++;
          this.generarPatron();
          this.patronUsuario = [];
          this.isUserTurn = false;
          setTimeout(() => this.jugarPatron(), 2000);
        }
      }
    }
    else{
      if(this.isGameOn)
      {
        if(this.perdio)
        {
          this.swalService.Error("Atención!", "Has perdido, para volver a jugar reinicia el juego.")
        }
        else
        {
          this.swalService.Error("Atención!", "Espera a que finalice la secuencia.")
        }        
      }
      else
      {
        this.swalService.Error("Atención!", "Debes iniciar el juego.")
      }
    }
  }

  reproducirSonido(color: number) {
    const audio = new Audio(`assets/simon/sonido${color}.mp3`);
    audio.play();
  }

  CrearResultado() {
    let resultado = {
      juego: 'Simon',
      puntaje: this.level,
      usuario: this.usuario,
      victoria: this.victoria,
      fecha: moment(new Date()).format('DD-MM-YYYY HH:mm:ss')
    }
    this.firestore.guardarResultado(resultado);
  }
}
