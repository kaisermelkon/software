import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { NgForm } from '@angular/forms';
import { GrupoService } from '../../shared/services/grupo/grupo.service';
import { DireccionService } from './../../shared/services/direccion/direccion.service';
import { Grupo } from '../../shared/models/Grupos';
import { Direccion } from './../../shared/models/Direccion';
import { UsuarioService } from 'src/app/shared/services/usuario/usuario.service';
import { PertenecesService } from 'src/app/shared/services/perteneces/perteneces.service';
import { Perteneces } from 'src/app/shared/models/Perteneces';
import { InvitacionService } from 'src/app/shared/services/invitacion/invitacion.service';

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
  perteneces: Perteneces;
  grupoId: any;
  addGrupoCodigo: any;
  nuevoPerteneces: any;
  solicitudesPendientes: boolean = false;
  invitaciones: any = []


  constructor(protected authService: AuthService, private grupoService: GrupoService, private direccionService: DireccionService, private usuarioService: UsuarioService, private pertenecesService: PertenecesService, private invitacionService: InvitacionService) {
    console.log(this.authService.token + "hello");
    this.grupo = new Grupo();
    this.direccion = new Direccion();
    this.perteneces = new Perteneces();
    this.nuevoPerteneces = new Perteneces();
  }

  async ngOnInit() {
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
    this.grupoService.getGrupoCodigo(this.grupo.codigo.toString()).subscribe(res => {
      this.grupoId = res;
    }, err => console.log(err));
    await this.sleep(1000);
    this.perteneces.grupoId = this.grupoId;
    console.log(this.perteneces.grupoId + " grupo Id");
    this.perteneces.usuarioId = this.usuarioService.usuario.id;
    console.log(this.perteneces.usuarioId + " usuario Id");
    this.pertenecesService.createPerteneces(this.perteneces);
    await this.sleep(1000);
  }

  async onSubmit2(form: NgForm) {
    this.addGrupoCodigo = form.value.nombre;
    this.grupoService.getGrupoCodigo(this.addGrupoCodigo).subscribe(res => {
      this.addGrupoCodigo = res;
    }, err => console.log(err));
    console.log(this.addGrupoCodigo + " id del grupo a unirse")
    await this.sleep(1000);
    this.nuevoPerteneces.usuarioId = this.usuarioService.usuario.id;
    this.nuevoPerteneces.grupoId = this.addGrupoCodigo;
    console.log(this.nuevoPerteneces.usuarioId + " id del usuario a unirse")
    this.pertenecesService.createPerteneces(this.nuevoPerteneces);
    await this.sleep(1000);
  }

  Open() {
    this.isOpen = !this.isOpen;
  }

  async sleep(ms) {
    ms=ms/2;
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
