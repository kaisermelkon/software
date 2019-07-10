import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/shared/models/Usuario';
import { UsuarioService } from 'src/app/shared/services/usuario/usuario.service';
import { CarroService } from 'src/app/shared/services/carro/carro.service';
import { Carro } from 'src/app/shared/models/Carro';
import { DireccionService } from 'src/app/shared/services/direccion/direccion.service';
import { Direccion} from 'src/app/shared/models/Direccion';


/**
 * Perfil Component
 */
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  /**
  *El usuario a observar
 */
  usuario: Usuario;
  /**
  *El carro a observar
 */
  carro: Carro;
  /**
  *@ignore
 */
  carroId: any;
  /**
  *@ignore
 */
  direccionId: any;
  /**
  *La direccion a observar
 */
  direccion: Direccion;

/**
 * Constructor
  * @param {UsuarioService} usuarioService El servicio para actualizar al usuario
  * @param {CarroService} carroService El servicio para actualizar al carro
  * @param {DireccionService} direccionService El servicio para actualizar la direccion
 */
  constructor(public usuarioService: UsuarioService, public carroService: CarroService, public direccionService: DireccionService) { }

  /**
 * Obtiene la data del usuario, carro y direccion para mostrar en pantalla
 */
  async ngOnInit() {
    this.usuario = new Usuario();
    this.carro = new Carro();
    this.direccion= new Direccion();
    console.log(this.usuarioService.usuario);
    this.usuario = this.usuarioService.usuario;
    if (this.usuarioService.usuario.carroId !== null) {
      this.carroService.getCarro(this.usuarioService.usuario.carroId);
      await this.sleep(1000);
      this.carro = this.carroService.carro;
    }
    if(this.usuarioService.usuario.direccionId !== null){
      this.direccionService.getDireccion(this.usuarioService.usuario.direccionId);
      await this.sleep(1000);
      this.direccion=this.direccionService.direccion;
    }
  }

  /**
  * Se actualiza el usuario
 * @param {NgForm} form  La data para actualizar el usuario
 */
  async onSubmit(form: NgForm) {
    this.usuarioService.updateUsuario(this.usuario, this.usuarioService.usuario.id);
    await this.sleep(1000);
    this.usuarioService.getUsuario(this.usuario.correo);
    await this.sleep(1000);
    this.usuario = this.usuarioService.usuario;
  }

    /**
   * Se actualiza la informacion del vehiculo
 * @param {NgForm} form  La data para actualizar el carro
 */
  async onSubmit2(form: NgForm) {
    if (this.carro.placa !== null) {
      if (this.usuario.carroId === null) {
        this.carroService.createCarro(this.carro);
        await this.sleep(2000);
        this.carroService.getCarroId(this.carro.placa).subscribe(res => {
          this.carroId = res;

        }, err => console.log(err));
        await this.sleep(1000);
        this.usuario.carroId = this.carroId;
      }
      else {
        this.carroService.updateCarro(this.carro, this.usuario.carroId.toString());
        await this.sleep(1000);
      }
      this.usuarioService.updateUsuario(this.usuario, this.usuarioService.usuario.id);
      await this.sleep(1000);
      this.usuarioService.getUsuario(this.usuario.correo);
      await this.sleep(1000);
      this.usuario = this.usuarioService.usuario;
    }

  }

  /**
   * Se actualiza la informacion de la direccion
 * @param {NgForm} form  La data para actualizar la direccion
 */
  async onSubmit3(form: NgForm){
    if(this.direccion.municipio !== null){
      if(this.usuario.direccionId === null){
        this.direccionService.createDireccion(this.direccion);
        await this.sleep(2000);
        this.direccionService.getDireccionId(this.direccion.municipio, this.direccion.urbanizacion, this.direccion.descripcion).subscribe(res => {
          this.direccionId = res;

        }, err => console.log(err));
        await this.sleep(1000);
        this.usuario.direccionId=this.direccionId;
      }
      else{
        this.direccionService.updateDireccion(this.direccion, this.usuario.direccionId.toString());
        await this.sleep(1000);
      }
      this.usuarioService.updateUsuario(this.usuario, this.usuarioService.usuario.id);
      await this.sleep(1000);
      this.usuarioService.getUsuario(this.usuario.correo);
      await this.sleep(1000);
      this.usuario = this.usuarioService.usuario;
    }
  }

  /**
   * @ignore
 */
  async sleep(ms) {
    ms=ms;
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
