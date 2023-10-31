import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path:'',
    redirectTo:'/home',
    pathMatch:'full'
  },
  {
    path:'home',
    loadChildren:() => import('../app/pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path:'auth',
    loadChildren:() => import('../app/pages/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path:'juegos',
    loadChildren:() => import('../app/pages/juegos/juegos.module').then(m => m.JuegosModule)
  },
  {
    path:'datos',
    loadChildren:() => import('../app/pages/datos/datos.module').then(m => m.DatosModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }