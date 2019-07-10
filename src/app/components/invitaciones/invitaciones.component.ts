import { Component, OnInit } from '@angular/core';
import { InvitacionService } from 'src/app/shared/services/invitacion/invitacion.service';
import { UsuarioService } from 'src/app/shared/services/usuario/usuario.service';
import { GrupoService } from 'src/app/shared/services/grupo/grupo.service';
import { CarroService } from 'src/app/shared/services/carro/carro.service';
import { Solicitud } from 'src/app/shared/models/Solicitud';
import { Usuario } from 'src/app/shared/models/Usuario';
import { Grupo } from 'src/app/shared/models/Grupos';
import { DireccionService } from 'src/app/shared/services/direccion/direccion.service';
import { Invitacion } from 'src/app/shared/models/Invitaciones';

/**
   * Invitaciones Componente
 */
@Component({
  selector: 'app-invitaciones',
  templateUrl: './invitaciones.component.html',
  styleUrls: ['./invitaciones.component.css']
})
export class InvitacionesComponent implements OnInit {

  /**
   * @ignore
 */
  solicitudes: any = [];
  /**
   * Todas las invitaciones del usuario
 */
  invitaciones: any = [];
  /**
   * @ignore
 */
  solicitudTemporal: any;
  /**
   * @ignore
 */
  usuarioTemporal: any;
  /**
   * @ignore
 */
  grupoTemporal: any;
  /**
   * @ignore
 */
  invitacionTemporal: any;

  /**
 * Constructor
  * @param {GrupoService} grupoService El servicio para manejar grupos
  * @param {DireccionService} direccionService El servicio para obtener la direccion
  * @param {UsuarioService} usuarioService El servicio para manejar al usuario
  * @param {CarroService} carroService El servicio para obtener los carros
  * @param {InvitacionService} invitacionService El servicio para obtener las invitaciones
 */
  constructor(public invitacionService: InvitacionService, public usuarioService: UsuarioService, public grupoService: GrupoService, public carroService: CarroService, public direccionService: DireccionService) { }

  /**
   * Obtiene todas las invitaciones del usuario para mostrarlas en pantalla
 */
  async ngOnInit() {
    this.solicitudTemporal = new Solicitud();
    this.usuarioTemporal = new Usuario();
    this.grupoTemporal = new Grupo();
    this.invitacionTemporal = new Invitacion();
    this.invitacionService.getInvitacionesUsuario(this.usuarioService.usuario.id).subscribe(res => {
      this.invitaciones = res;

    }, err => console.log(err));
    await this.sleep(500);
    console.log(this.invitaciones);
    for (let invitacion of this.invitaciones) {
      this.usuarioService.getUsuarioDetalle(invitacion.usuarioId).subscribe(res => {
        this.usuarioTemporal = res;

      }, err => console.log(err));
      await this.sleep(500);
      this.grupoService.getGrupoDetalle(invitacion.grupoId);
      await this.sleep(500);
      this.solicitudes.push({
        invitacionTipo: invitacion.tipo,
        invitacionId: invitacion.id,
        usuarioNombre: this.usuarioTemporal.nombre,
        usuarioTelefono: this.usuarioTemporal.telefono,
        usuarioCorreo: this.usuarioTemporal.correo,
        grupoNombre: this.grupoService.grupo.nombre

      });
      /*this.solicitudTemporal.invitacionTipo = invitacion.tipo;
      this.solicitudTemporal.invitacionId = invitacion.id;
      this.usuarioService.getUsuarioDetalle(invitacion.usuarioId).subscribe(res => {
        this.usuarioTemporal = res;

      }, err => console.log(err));
      await this.sleep(500);
      this.solicitudTemporal.usuarioNombre = this.usuarioTemporal.nombre;
      this.solicitudTemporal.usuarioTelefono = this.usuarioTemporal.telefono;
      this.solicitudTemporal.usuarioCorreo = this.usuarioTemporal.correo;
      this.grupoService.getGrupoDetalle(invitacion.grupoId);
      await this.sleep(500);
      this.solicitudTemporal.grupoNombre = this.grupoService.grupo.nombre;
      console.log(this.solicitudTemporal);
      this.solicitudes.push(this.solicitudTemporal);
      console.log(this.solicitudes)*/
    }
    console.log(this.solicitudes)

  }

  /**
   * Activa el modal de los detalles de la solicitud
   * @param {Solicitud} solicitud La solicitud de la cual se desea obtener mas detalles
 */
  async activarModal(solicitud: Solicitud) {
    this.solicitudTemporal = solicitud;
    this.invitacionService.getInvitacion(solicitud.invitacionId.toString());
    await this.sleep(500);
    this.usuarioService.getUsuarioDetalle(this.invitacionService.invitacion.usuarioId).subscribe(res => {
      this.usuarioTemporal = res;

    }, err => console.log(err));
    await this.sleep(500);
    console.log(this.usuarioTemporal);
    this.carroService.getCarro(this.usuarioTemporal.carroId);
    this.direccionService.getDireccion(this.usuarioTemporal.direccionId);
    await this.sleep(500);

  }

  /**
   * Acepta un pedido de transporte
 */
  async aceptar() {
    this.invitacionTemporal.usuarioId = this.invitacionService.invitacion.usuarioExId;
    this.invitacionTemporal.usuarioExId = this.invitacionService.invitacion.usuarioId;
    this.invitacionTemporal.grupoId = this.invitacionService.invitacion.grupoId;
    this.invitacionTemporal.tipo = "aceptacion";
    this.invitacionService.createInvitacion(this.invitacionTemporal);
    await this.sleep(500);
    this.eliminar(this.solicitudTemporal);
  }


  /**
   * Elimina una solicitud 
   * @param {Solicitud} solicitud La solicitud a eliminar
 */
  async eliminar(solicitud: Solicitud) {
    this.invitacionService.deleteInvitacion(solicitud.invitacionId.toString());
    await this.sleep(500);
  }


  /**
   * @ignore
 */
  async sleep(ms) {
    ms=ms*2;
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
