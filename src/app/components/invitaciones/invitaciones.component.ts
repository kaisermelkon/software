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

@Component({
  selector: 'app-invitaciones',
  templateUrl: './invitaciones.component.html',
  styleUrls: ['./invitaciones.component.css']
})
export class InvitacionesComponent implements OnInit {

  solicitudes: any=[];
  invitaciones: any=[];
  solicitudTemporal: any;
  usuarioTemporal: any;
  grupoTemporal: any;
  invitacionTemporal: any;


  constructor(private invitacionService: InvitacionService, private usuarioService: UsuarioService, private grupoService: GrupoService, private carroService: CarroService, private direccionService: DireccionService) { }

  async ngOnInit() {
    this.solicitudTemporal = new Solicitud();
    this.usuarioTemporal=new Usuario();
    this.grupoTemporal=new Grupo();
    this.invitacionTemporal=new Invitacion();
    this.invitacionService.getInvitacionesUsuario(this.usuarioService.usuario.id).subscribe(res => {
      this.invitaciones = res;
      
    }, err => console.log(err));
    await this.sleep(500);
    console.log(this.invitaciones);
    for(let invitacion of this.invitaciones){
      this.solicitudTemporal.invitacionTipo=invitacion.tipo;
      this.solicitudTemporal.invitacionId=invitacion.id;
      this.usuarioService.getUsuarioDetalle(invitacion.usuarioId).subscribe(res => {
        this.usuarioTemporal = res;
        
      }, err => console.log(err));
      await this.sleep(500);
      this.solicitudTemporal.usuarioNombre=this.usuarioTemporal.nombre;
      this.solicitudTemporal.usuarioTelefono=this.usuarioTemporal.telefono;
      this.solicitudTemporal.usuarioCorreo=this.usuarioTemporal.correo;
      this.grupoService.getGrupoDetalle(invitacion.grupoId);
      await this.sleep(500);
      this.solicitudTemporal.grupoNombre=this.grupoService.grupo.nombre;
      this.solicitudes.push(this.solicitudTemporal);
    }

  }

  async activarModal(solicitud: Solicitud){
    this.solicitudTemporal=solicitud;
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

  async aceptar(){
    this.invitacionTemporal.usuarioId=this.invitacionService.invitacion.usuarioExId;
    this.invitacionTemporal.usuarioExId=this.invitacionService.invitacion.usuarioId;
    this.invitacionTemporal.grupoId=this.invitacionService.invitacion.grupoId;
    this.invitacionTemporal.tipo="aceptacion";
    this.invitacionService.createInvitacion(this.invitacionTemporal);
    await this.sleep(500);
    this.eliminar(this.solicitudTemporal);
  }

  async eliminar(solicitud: Solicitud){
    this.invitacionService.deleteInvitacion(solicitud.invitacionId.toString());
    await this.sleep(500);
  }

  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
