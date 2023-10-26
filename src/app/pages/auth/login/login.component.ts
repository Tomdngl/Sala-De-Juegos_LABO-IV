import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder,FormGroup, Validators,AbstractControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { SwalService } from 'src/app/services/swal.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin:FormGroup
  usuario:any

  ngOnInit(): void {}

  constructor(private router:Router,private formBuilder:FormBuilder,private angularFireAuth:UserService,private swal:SwalService) {
    this.formLogin = this.formBuilder.group({
      clave: ['',[Validators.required,Validators.minLength(6)]],
      email:['', [Validators.email, Validators.required]]
    });
  }

  async Loguear()
  {
    const user = this.formLogin.value

    try {
      const res = await this.angularFireAuth.Login(user)

      if(res)
      {
        this.swal.MostrarExito("Sesión iniciada","Redirigiendo a home").then(() => {
          this.CargarForm(-1)
          this.router.navigate([''])
        })
      }
    } catch (error) {
      this.swal.MostrarError("Error","Las credenciales no son correctas")
      this.CargarForm(-1)
    }
  }

  CargarForm(user:number)
  {
    switch (user) {
      case -1:
        this.formLogin.reset()
        break;
      case 1:
        this.formLogin.patchValue({
          email:"admin@admin.com",
          clave:"admin1234"
        })
        break;
      case 2:
        this.formLogin.patchValue({
          email:"empleado@empleado.com",
          clave:"empleado1234"
        })
        break;
    }
  }
}