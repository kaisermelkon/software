import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { NgForm } from '@angular/forms';
import { GrupoService } from '../../shared/services/grupo/grupo.service';
import { DireccionService } from './../../shared/services/direccion/direccion.service';
import { Grupo } from '../../shared/models/Grupos';
import { Direccion } from './../../shared/models/Direccion';
import { UsuarioService } from 'src/app/shared/services/usuario/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private isOpen = false;
  grupo: Grupo;
  direccion: Direccion;
  direccionId: any;


  constructor(protected authService: AuthService, private grupoService: GrupoService, private direccionService: DireccionService, private usuarioService: UsuarioService) {
    console.log(this.authService.token + "hello");
    this.grupo = new Grupo();
    this.direccion = new Direccion();
  }

  ngOnInit() {
  }

  async onSubmit(form: NgForm) {
    this.grupo.nombre = form.value.nombre;
    this.grupo.codigo = Math.floor(10000000 + Math.random() * 90000000);
    this.direccion.municipio = form.value.municipio;
    this.direccion.descripcion = form.value.descripcion;
    this.direccion.urbanizacion = form.value.urbanizacion;
    await this.direccionService.createDireccion(this.direccion);
    await this.sleep(1000);
    await this.direccionService.getDireccionId(this.direccion.municipio, this.direccion.urbanizacion, this.direccion.descripcion).subscribe(res => {
      this.direccionId = res;
    }, err => console.log(err));
    await this.sleep(1000);
    //while(this.grupoService.getGruposCodigo(this.grupo.codigo.toString())){

    //this.grupo.codigo=Math.floor(10000000 + Math.random() * 90000000);
    //}
    this.grupo.administradorId = this.usuarioService.usuario.id;
    this.grupo.direccionId = this.direccionId;
    await this.grupoService.createGrupo(this.grupo);
    await this.sleep(1000);
  }

  async onSubmit2(form: NgForm){
    
  }

  Open() {
    this.isOpen = !this.isOpen;
  }

  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
