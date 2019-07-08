import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Perteneces} from '../../models/Perteneces';
import {Observable} from 'rxjs';


/**
   * Perteneces Servicio
 */
@Injectable({
  providedIn: 'root'
})
export class PertenecesService {

  /**
   * Un perteneces
 */
  perteneces: any;
  /**
   * La direccion a donde hacer los pedidos al backend
 */
  URL_API = 'http://localhost:3000/api/perteneces';


   /**
 * Constructor
  * @param {HttpClient} http Conectar con el backend
 */
  constructor(private http: HttpClient) { 
   
  }

  /**
   * Obtiene todos los perteneces
   * @return la respuesta del servidor
 */
  getUsuarios() {
    return this.http.get(`${this.URL_API}`);
  }

  /**
   * Obtiene un perteneces
   * @param {string} id El id del perteneces a obtener
   * @return la respuesta del servidor
 */
  async getPerteneces(id: string){
    return this.http.get(`${this.URL_API}/${id}`).subscribe(res => {
      this.perteneces = res;
    }, err => console.log(err));
  }

  /**
   * Crea un perteneces
   * @param {Perteneces} perteneces El perteneces a crear en la base de datos
   * @return la respuesta del servidor
 */
  async createPerteneces(perteneces: Perteneces) {
    this.http.post(`${this.URL_API}`, perteneces).subscribe(res => console.log(res), err => console.log(err));
  }

  /**
   * Actualiza un perteneces
   * @param {Perteneces} perteneces El perteneces a actualizar
   * @param {string} id El id del perteneces a actualizar
   * @return la respuesta del servidor
 */
  updatePerteneces(perteneces: Perteneces, id: string): Observable<any> {
    return this.http.put(`${this.URL_API}/${id}`, perteneces);
  }

  /**
   * Elimina un perteneces
   * @param {string} id El id del perteneces a eliminar
   * @return la respuesta del servidor
 */
  deletePerteneces(id: string){
    return this.http.delete(`${this.URL_API}/${id}`).subscribe(res => console.log(res), err => console.log(err));;
  }

  /**
   * Obtiene todos los perteneces de un usuario
   * @param {string} usuarioId El id del usuario
   * @return la respuesta del servidor
 */
  getPerGrupos(usuarioId: string){
    return this.http.get(`${this.URL_API}/perGrupos/${usuarioId}`);
  }

  /**
   * Obtiene todos los usuarios de un grupo
   * @param {string} grupoId El id del grupo
   * @return la respuesta del servidor
 */
  getPerUsuarios(grupoId: string){
    return this.http.get(`${this.URL_API}/perUsuarios/${grupoId}`);
  }

  /**
   * Obtiene el pertenecs de un usuario en un grupo
   * @param {string} grupoId El id del grupo
   * @param {string} usuarioId El id del usuario
   * @return la respuesta del servidor
 */
  getPerUsuariosGrupos(grupoId: string, usuarioId: string){
    return this.http.get(`${this.URL_API}/perteneces/${grupoId}/${usuarioId}`);
  }

  /**
   * Revisa si un usaurio pertenece a un grupo
   * @param {string} grupoId El id del grupo
   * @param {string} usuarioId El id del usuario
   * @return la respuesta del servidor
 */
  getPerUsuariosGruposBoolean(grupoId: string, usuarioId: string){
    return this.http.get(`${this.URL_API}/perteneces/boolean/${grupoId}/${usuarioId}`);
  }

}
