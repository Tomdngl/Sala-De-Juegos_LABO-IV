import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-quien-soy',
  templateUrl: './quien-soy.component.html',
  styleUrls: ['./quien-soy.component.scss']
})
export class QuienSoyComponent {

  perfil:any;
  urlApi:string = "https://api.github.com/users/Tomdngl";

  constructor(private http:HttpClient) {}

  ngOnInit(): void {
      this.http.get(this.urlApi).subscribe(res => this.perfil = res);
  }
}