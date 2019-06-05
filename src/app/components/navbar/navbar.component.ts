import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import {NgForm} from '@angular/forms';
import {GrupoService} from '../../shared/services/grupo/grupo.service';
import {Grupo} from '../../shared/models/Grupos';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private isOpen = false;
  grupo: Grupo;

  constructor(protected authService: AuthService, private grupoService: GrupoService) { 
    console.log(this.authService.token+"hello");
    this.grupo= new Grupo();
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.grupo.nombre = form.value.nombre;
    this.grupo.codigo=Math.floor(10000000 + Math.random() * 90000000);
    while(this.grupoService.getGruposCodigo(this.grupo.codigo.toString())){
      this.grupo.codigo=Math.floor(10000000 + Math.random() * 90000000);
    }
    this.grupoService.createGrupo(this.grupo);
  }

  Open() {
    this.isOpen = !this.isOpen;
  }

}
