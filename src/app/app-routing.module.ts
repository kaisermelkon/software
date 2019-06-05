import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { AuthGuardService } from './shared/services/authGuard/auth-guard.service';
import { PerfilComponent } from './components/perfil/perfil.component';
import { GrupoComponent } from './components/grupo/grupo.component';

const routes: Routes = [
  {path: 'registrarse', component: RegistroComponent},
  {path: 'grupo', component: GrupoComponent},
  {path: 'inicio', component: InicioComponent},
  {path: 'perfil', component: PerfilComponent},
  {path: '**', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
