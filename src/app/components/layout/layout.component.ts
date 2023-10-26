import { Component, OnInit,Output,EventEmitter} from '@angular/core';
import { SwalService } from 'src/app/services/swal.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  usuario:any = null
  chatDesplegado = false;
  @Output() DesplegarChat = new EventEmitter<boolean>();

  constructor(public userService: UserService, private swal: SwalService) { }

  ngOnInit() {
    this.userService.user$.subscribe((user:any) => {
      if(user){
        this.usuario = user
      }
      else{
        this.usuario = null
      }
    }) 
  }

  CerrarSesion()
  {
    this.swal.MostrarConfirmacion("Confirmación", "¿Desea cerrar sesión?").then((res) => {
      if(res.isConfirmed){
        this.chatDesplegado = false
        this.userService.SignOut()
      }
      else{
        Swal.fire('Su sesión sigue activa.', '', 'info')
      }
    })
  }

  MostrarChat()
  {
    this.chatDesplegado = !this.chatDesplegado;
    this.DesplegarChat.emit(this.chatDesplegado)
  }
}