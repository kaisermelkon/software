import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Usuario} from '../../models/Usuario';
import {Observable} from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: any;

  URL_API = 'http://localhost:3000/api/usuarios';


  constructor(private http: HttpClient) { 
   
  }

  getUsuarios() {
    return this.http.get(`${this.URL_API}`);
  }

  async getUsuario(correo: string){
    return this.http.get(`${this.URL_API}/${correo}`).subscribe(res => {
      this.usuario = res;
    }, err => console.log(err));
  }

  async createUsuario(usuario: Usuario) {
    this.http.post(`${this.URL_API}`, usuario).subscribe(res => console.log(res), err => console.log(err));
  }

  updateUsuario(usuario: Usuario, id: string){
    return this.http.put(`${this.URL_API}/${id}`, usuario).subscribe(res => console.log(res), err => console.log(err));;
  }

  deleteUsuario(id: string){
    return this.http.delete(`${this.URL_API}/${id}`);
  }

  getUsuarioDetalle(id: string){
    return this.http.get(`${this.URL_API}/detalle/${id}`);
  }

}
