import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { GrupoComponent } from './components/grupo/grupo.component';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AuthService } from './shared/services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { UsuarioService } from './shared/services/usuario/usuario.service';
import { GrupoService } from './shared/services/grupo/grupo.service';
import { DireccionService } from './shared/services/direccion/direccion.service';
import { PertenecesService } from './shared/services/perteneces/perteneces.service';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegistroComponent,
    InicioComponent,
    PerfilComponent,
    GrupoComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthService, AngularFireAuth, UsuarioService, GrupoService, DireccionService, PertenecesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
