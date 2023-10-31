import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ResultadosService } from 'src/app/services/resultados.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-respuestas-encuesta',
  templateUrl: './respuestas-encuesta.component.html',
  styleUrls: ['./respuestas-encuesta.component.scss']
})
export class RespuestasEncuestaComponent {
  usuario: any = null;
  listaRespuestas: any[] = [];

  constructor(private authService: UserService, private router: Router, private resultados:ResultadosService) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user: any) => {
      if (user) {
        this.usuario = user;
        if (user.rolUsuario == 'admin') {
          this.authService.esAdmin = true;
        }
      } else {
        this.router.navigate(['/login']);
      }
    });
    this.resultados.traer('encuestas').subscribe((res) => {
      if (res != null) {
        this.listaRespuestas = res;
      }
    })
  }
}
