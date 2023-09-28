import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators,AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
  formRegister:FormGroup
  usuario:any

  ngOnInit(): void {

  }

  constructor(private router:Router,private formBuilder:FormBuilder) {
    this.formRegister = this.formBuilder.group({
      nombre: ['',[Validators.required,this.ValidadorEspacio]],
      clave: ['',[Validators.required,Validators.minLength(6)]],
      email:['', [Validators.email, Validators.required]]
    });
  }

  Registro()
  {
    
  }

  private ValidadorEspacio(control: AbstractControl): null | object {
    const nombre = control.value;
    const spaces = nombre.includes(' ');

    return spaces ? { containsSpaces: true } : null; 
  }
}