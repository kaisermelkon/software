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


/**
   * Navbar Component
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  /**
   * @ignore
 */
public isOpen = false;
  /**
   * El Grupo que se va a crear o unir
 */
  grupo: Grupo;
  /**
   * La direccion del grupo a crearse
 */
  direccion: Direccion;
  /**
   * @ignore
 */
  direccionId: any;
  /**
   * @ignore
 */
  perteneces: Perteneces;
  /**
   * @ignore
 */
  grupoId: any;
  /**
   * El codigo del grupo a unirse
 */
  addGrupoCodigo: any;
  /**
   * @ignore
 */
  nuevoPerteneces: any;
  /**
   * Si el usuario posee solicitudes pendientes
 */
  solicitudesPendientes: boolean = false;
  /**
   * Todas las invitaciones del usuario
 */
  invitaciones: any = []
  /**
   * @ignore
 */
  pertenecesExistente: any=true;

  /**
 * Constructor
  * @param {AuthService} authService El servicio para verificar al usuario
  * @param {GrupoService} grupoService El servicio para manejar grupos
  * @param {DireccionService} direccionService El servicio para obtener la direccion
  * @param {UsuarioService} usuarioService El servicio para manejar al usuario
  * @param {PertenecesService} pertenecesService El servicio para unir grupos con usuarios
  * @param {InvitacionService} invitacionService El servicio para obtener las invitaciones
 */
  constructor(public authService: AuthService, public grupoService: GrupoService, public direccionService: DireccionService, public usuarioService: UsuarioService, public pertenecesService: PertenecesService, public invitacionService: InvitacionService) {
    console.log(this.authService.token + "hello");
    this.grupo = new Grupo();
    this.direccion = new Direccion();
    this.perteneces = new Perteneces();
    this.nuevoPerteneces = new Perteneces();
  }

  /**
   * @ignore
 */
  async ngOnInit() {
  }

  /**
   * Crea un grupo nuevo
   * @param {NgForm} form Los datos del grupo a crear
 */
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
  
  /**
   * El usuario se une a un grupo preexistente
   * @param {NgForm} form Los datos del grupo a unirse
 */
  async onSubmit2(form: NgForm) {
    this.addGrupoCodigo = form.value.nombre;
    this.grupoService.getGrupoCodigo(this.addGrupoCodigo).subscribe(res => {
      this.addGrupoCodigo = res;
    }, err => console.log(err));
    console.log(this.addGrupoCodigo + " id del grupo a unirse")
    await this.sleep(1000);
    this.pertenecesService.getPerUsuariosGruposBoolean(this.addGrupoCodigo, this.usuarioService.usuario.id).subscribe(res => {
      this.pertenecesExistente = res;
    }, err => console.log(err));
    await this.sleep(1000);
    console.log(this.pertenecesExistente);
    if (this.pertenecesExistente) {
      console.log("es cierto");
      this.nuevoPerteneces.usuarioId = this.usuarioService.usuario.id;
      this.nuevoPerteneces.grupoId = this.addGrupoCodigo;
      console.log(this.nuevoPerteneces.usuarioId + " id del usuario a unirse")
      this.pertenecesService.createPerteneces(this.nuevoPerteneces);
      await this.sleep(1000);
    }
    this.pertenecesExistente=true;

  }

  /**
   * @ignore
 */
  Open() {
    this.isOpen = !this.isOpen;
  }

   /**
   * @ignore
 */
  async sleep(ms) {
    ms = ms;
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
