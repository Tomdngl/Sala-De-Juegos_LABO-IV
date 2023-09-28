import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder,FormGroup, Validators,AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  formLogin:FormGroup

  constructor(private router:Router,private formBuilder:FormBuilder) {
    this.formLogin = this.formBuilder.group({
      clave: ['',[Validators.required,Validators.minLength(6)]],
      email:['', [Validators.email, Validators.required]]
    });
  }
}
