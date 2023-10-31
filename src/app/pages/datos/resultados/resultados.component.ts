import { Component, OnInit } from '@angular/core';
import { ResultadosService } from 'src/app/services/resultados.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss']
})
export class ResultadosComponent implements OnInit {
  usuarioSeleccionado = "";

  ahorcadoVecesJugadas: number = 0;
  mayorMenorVecesJugadas: number = 0;
  preguntadosVecesJugadas: number = 0;
  simonVecesJugadas: number = 0;

  ahorcadoVictorias: number = 0;
  mayorMenorVictorias: number = 0;
  preguntadosVictorias: number = 0;
  simonVictorias: number = 0;

  ahorcadoDerrotas: number = 0;
  mayorMenorDerrotas: number = 0;
  preguntadosDerrotas: number = 0;
  simonDerrotas: number = 0;

  ahorcadoPuntajePromedio: number = 0;
  mayorMenorPuntajePromedio: number = 0;
  preguntadosPuntajePromedio: number = 0;
  simonPuntajePromedio = 0;

  ahorcadoPuntajeTotal: number = 0;
  mayorMenorPuntajeTotal: number = 0;
  preguntadosPuntajeTotal: number = 0;
  simonPuntajeTotal: number = 0;
  seleccionoUnUsuario: boolean = false;

  usuariosRegistrados: any = [];
  resultados: any[] = [];

  ahorcadoVecesJugadasDelUsuarioSeleccionado: number = 0;
  mayorMenorVecesJugadasDelUsuarioSeleccionado: number = 0;
  preguntadosVecesJugadasDelUsuarioSeleccionado: number = 0;
  simonVecesJugadasDelUsuarioSeleccionado: number = 0;

  ahorcadoVictoriasDelUsuarioSeleccionado: number = 0;
  mayorMenorVictoriasDelUsuarioSeleccionado: number = 0;
  preguntadosVictoriasDelUsuarioSeleccionado: number = 0;
  simonVictoriasDelUsuarioSeleccionado: number = 0;

  ahorcadoDerrotasDelUsuarioSeleccionado: number = 0;
  mayorMenorDerrotasDelUsuarioSeleccionado: number = 0;
  preguntadosDerrotasDelUsuarioSeleccionado: number = 0;
  simonDerrotasDelUsuarioSeleccionado: number = 0;

  ahorcadoPuntajePromedioDelUsuarioSeleccionado: number = 0;
  mayorMenorPuntajePromedioDelUsuarioSeleccionado: number = 0;
  preguntadosPuntajePromedioDelUsuarioSeleccionado: number = 0;
  simonPuntajePromedioDelUsuarioSeleccionado = 0

  ahorcadoPuntajeTotalDelUsuarioSeleccionado: number = 0;
  mayorMenorPuntajeTotalDelUsuarioSeleccionado: number = 0;
  preguntadosPuntajeTotalDelUsuarioSeleccionado: number = 0;
  simonPuntajeTotalDelUsuarioSeleccionado: number = 0;

  constructor(private resultadosService: ResultadosService) { }

  ngOnInit(): void {
    this.resultadosService.traer("resultadosJuegos").subscribe((res: any) => {
      if (res != null) {
        for (const unResultado of res) {
          this.resultados.push(unResultado);
        }
        this.generarTablaGeneral(this.resultados);
      }
    });

    this.resultadosService.traer("usuarios").subscribe((res: any) => {
      for (const unUsuario of res) {
        this.usuariosRegistrados.push(unUsuario);
      }
    });
  }

  generarTablaGeneral(resultados: any) {
    for (const unResultado of resultados) {
      switch (unResultado.juego) {
        case "Preguntados":
          if (unResultado.victoria) {
            this.preguntadosVictorias += 1;
          }
          else {
            this.preguntadosDerrotas += 1;
          }
          this.preguntadosVecesJugadas = this.preguntadosDerrotas + this.preguntadosVictorias;
          this.preguntadosPuntajeTotal += unResultado.puntaje;
          this.preguntadosPuntajePromedio = this.preguntadosPuntajeTotal / this.preguntadosVecesJugadas;
          this.preguntadosPuntajePromedio = Number(this.preguntadosPuntajePromedio.toFixed(2));
          break;
        case "MayorMenor":
          if (unResultado.victoria) {
            this.mayorMenorVictorias += 1;
          }
          else {
            this.mayorMenorDerrotas += 1;
          }
          this.mayorMenorVecesJugadas = this.mayorMenorDerrotas + this.mayorMenorVictorias;
          this.mayorMenorPuntajeTotal += unResultado.puntaje;
          this.mayorMenorPuntajePromedio = this.mayorMenorPuntajeTotal / this.mayorMenorVecesJugadas;
          this.mayorMenorPuntajePromedio = Number(this.mayorMenorPuntajePromedio.toFixed(2));
          break;
        case "Ahorcado":
          if (unResultado.victoria) {
            this.ahorcadoVictorias += 1;
          }
          else {
            this.ahorcadoDerrotas += 1;
          }
          this.ahorcadoVecesJugadas = this.ahorcadoDerrotas + this.ahorcadoVictorias;
          this.ahorcadoPuntajeTotal += unResultado.puntaje;
          this.ahorcadoPuntajePromedio = this.ahorcadoPuntajeTotal / this.ahorcadoVecesJugadas;
          this.ahorcadoPuntajePromedio = Number(this.ahorcadoPuntajePromedio.toFixed(2));
          break;
        case "Simon":
          if (unResultado.victoria) {
            this.simonVictorias += 1;
          }
          else {
            this.simonDerrotas += 1;
          }
          this.simonVecesJugadas = this.simonVictorias + this.simonDerrotas;
          this.simonPuntajeTotal += unResultado.puntaje;
          this.simonPuntajePromedio = this.simonPuntajeTotal / this.simonVecesJugadas;
          this.simonPuntajePromedio = Number(this.simonPuntajePromedio.toFixed(2));
          break;
      }
    }
  }

  reiniciarTabla() {
    this.seleccionoUnUsuario = false;

    this.ahorcadoVecesJugadasDelUsuarioSeleccionado = 0;
    this.mayorMenorVecesJugadasDelUsuarioSeleccionado = 0;
    this.preguntadosVecesJugadasDelUsuarioSeleccionado = 0;
    this.simonVecesJugadasDelUsuarioSeleccionado = 0;

    this.ahorcadoVictoriasDelUsuarioSeleccionado = 0;
    this.mayorMenorVictoriasDelUsuarioSeleccionado = 0;
    this.preguntadosVictoriasDelUsuarioSeleccionado = 0;
    this.simonVictoriasDelUsuarioSeleccionado = 0;

    this.ahorcadoDerrotasDelUsuarioSeleccionado = 0;
    this.mayorMenorDerrotasDelUsuarioSeleccionado = 0;
    this.preguntadosDerrotasDelUsuarioSeleccionado = 0;
    this.simonDerrotasDelUsuarioSeleccionado = 0;

    this.ahorcadoPuntajePromedioDelUsuarioSeleccionado = 0;
    this.mayorMenorPuntajePromedioDelUsuarioSeleccionado = 0;
    this.preguntadosPuntajePromedioDelUsuarioSeleccionado = 0;
    this.simonPuntajePromedioDelUsuarioSeleccionado = 0;

    this.ahorcadoPuntajeTotalDelUsuarioSeleccionado = 0;
    this.mayorMenorPuntajeTotalDelUsuarioSeleccionado = 0;
    this.preguntadosPuntajeTotalDelUsuarioSeleccionado = 0;
    this.simonPuntajeTotalDelUsuarioSeleccionado = 0;
  }

  generarEstadisticasIndividuales() {
    const selectElement = document.getElementById("usuariosRegistrados") as HTMLSelectElement;
    this.usuarioSeleccionado = selectElement.value;

    for (const unResultado of this.resultados) {
      switch (unResultado.juego) {
        case "Preguntados":
          if (this.usuarioSeleccionado == unResultado.usuario.nombre) {
            if (unResultado.victoria) {
              this.preguntadosVictoriasDelUsuarioSeleccionado += 1;
            }
            else if (!unResultado.victoria) {
              this.preguntadosDerrotasDelUsuarioSeleccionado += 1;
            }
            this.preguntadosPuntajeTotalDelUsuarioSeleccionado += unResultado.puntaje;
            this.preguntadosVecesJugadasDelUsuarioSeleccionado = this.preguntadosDerrotasDelUsuarioSeleccionado + this.preguntadosVictoriasDelUsuarioSeleccionado;
            this.preguntadosPuntajePromedioDelUsuarioSeleccionado = this.preguntadosPuntajeTotalDelUsuarioSeleccionado / this.preguntadosVecesJugadasDelUsuarioSeleccionado;
          }
          break;
        case "MayorMenor":
          if (this.usuarioSeleccionado == unResultado.usuario.nombre) {
            if (unResultado.victoria) {
              this.mayorMenorVictoriasDelUsuarioSeleccionado += 1;
            }
            else if (!unResultado.victoria) {
              this.mayorMenorDerrotasDelUsuarioSeleccionado += 1;
            }
            this.mayorMenorPuntajeTotalDelUsuarioSeleccionado += unResultado.puntaje;
            this.mayorMenorVecesJugadasDelUsuarioSeleccionado = this.mayorMenorDerrotasDelUsuarioSeleccionado + this.mayorMenorVictoriasDelUsuarioSeleccionado;
            this.mayorMenorPuntajePromedioDelUsuarioSeleccionado = this.mayorMenorPuntajeTotalDelUsuarioSeleccionado / this.mayorMenorVecesJugadasDelUsuarioSeleccionado;
          }
          break;
        case "Ahorcado":
          if (this.usuarioSeleccionado == unResultado.usuario.nombre) {
            if (unResultado.victoria) {
              this.ahorcadoVictoriasDelUsuarioSeleccionado += 1;
            }
            else if (!unResultado.victoria) {
              this.ahorcadoDerrotasDelUsuarioSeleccionado += 1;
            }
            this.ahorcadoPuntajeTotalDelUsuarioSeleccionado += unResultado.puntaje;
            this.ahorcadoVecesJugadasDelUsuarioSeleccionado = this.ahorcadoDerrotasDelUsuarioSeleccionado + this.ahorcadoVictoriasDelUsuarioSeleccionado;
            this.ahorcadoPuntajePromedioDelUsuarioSeleccionado = this.ahorcadoPuntajeTotalDelUsuarioSeleccionado / this.ahorcadoVecesJugadasDelUsuarioSeleccionado;
          }
          break;
        case "Simon":
          if (this.usuarioSeleccionado == unResultado.usuario.nombre) {

            if (unResultado.victoria) {
              this.simonVictoriasDelUsuarioSeleccionado += 1;
            }
            else if (!unResultado.victoria) {
              this.simonDerrotasDelUsuarioSeleccionado += 1;
            }

            if (unResultado.puntaje > this.simonPuntajePromedioDelUsuarioSeleccionado) {
              this.simonPuntajePromedioDelUsuarioSeleccionado = unResultado.puntaje;
            }

            this.simonVecesJugadasDelUsuarioSeleccionado = this.simonDerrotasDelUsuarioSeleccionado + this.simonVictoriasDelUsuarioSeleccionado;

          }
          break;
      }
    }
    this.seleccionoUnUsuario = true;
  }
}
