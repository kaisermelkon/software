import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/shared/models/Usuario';
import { UsuarioService } from 'src/app/shared/services/usuario/usuario.service';
import { CarroService } from 'src/app/shared/services/carro/carro.service';
import { Carro } from 'src/app/shared/models/Carro';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  usuario: Usuario;
  carro: Carro;
  carroId: any;

  constructor(private usuarioService: UsuarioService, private carroService: CarroService) { }

  async ngOnInit() {
    this.usuario = new Usuario();
    this.carro = new Carro();
    console.log(this.usuarioService.usuario);
    this.usuario = this.usuarioService.usuario;
    if (this.usuarioService.usuario.carroId !== null) {
      this.carroService.getCarro(this.usuarioService.usuario.carroId);
      await this.sleep(1000);
      this.carro = this.carroService.carro;
    }
  }

  async onSubmit(form: NgForm) {
    this.usuarioService.updateUsuario(this.usuario, this.usuarioService.usuario.id);
    await this.sleep(1000);
    this.usuarioService.getUsuario(this.usuario.correo);
    await this.sleep(1000);
    this.usuario = this.usuarioService.usuario;
  }

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

  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
