import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Usuario} from '../../models/Usuario';
import {Observable} from 'rxjs';


/**
   * Usuario Servicio
 */
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  /**
   * Un usuario
 */
  usuario: any;
  /**
   * La direccion a donde hacer los pedidos al backend
 */
  URL_API = 'http://localhost:3000/api/usuarios';


   /**
 * Constructor
  * @param {HttpClient} http Conectar con el backend
 */
  constructor(private http: HttpClient) { 
   
  }

  /**
   * Obtiene todos los usuarios
   * @return la respuesta del servidor
 */
  getUsuarios() {
    return this.http.get(`${this.URL_API}`);
  }

  /**
   * Obtiene un usuario
   * @param {string} correo El correo dle usuario
   * @return la respuesta del servidor
 */
  async getUsuario(correo: string){
    return this.http.get(`${this.URL_API}/${correo}`).subscribe(res => {
      this.usuario = res;
    }, err => console.log(err));
  }

  /**
   * Crea un usuario
   * @param {Usuairo} usuario El usuario a crear en la base de datos
   * @return la respuesta del servidor
 */
  async createUsuario(usuario: Usuario) {
    this.http.post(`${this.URL_API}`, usuario).subscribe(res => console.log(res), err => console.log(err));
  }

  /**
   * Actualiza un usuario
   * @param {Usuario} usuario El usuario a actualizar
   * @param {string} id El id del usuario a actualizar
   * @return la respuesta del servidor
 */
  updateUsuario(usuario: Usuario, id: string){
    return this.http.put(`${this.URL_API}/${id}`, usuario).subscribe(res => console.log(res), err => console.log(err));;
  }

  /**
   * Elimina un usuario
   * @param {string} id El id del usuario a eliminar
   * @return la respuesta del servidor
 */
  deleteUsuario(id: string){
    return this.http.delete(`${this.URL_API}/${id}`);
  }

  /**
   * Obtiene un usuario
   * @param {string} id El id del usuario a obtener
   * @return la respuesta del servidor
 */
  getUsuarioDetalle(id: string){
    return this.http.get(`${this.URL_API}/detalle/${id}`);
  }

}
