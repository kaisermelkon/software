import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Grupo} from '../../models/Grupos';
import {Observable} from 'rxjs';

/**
   * Servicio de grupo
 */
@Injectable({
  providedIn: 'root'
})
export class GrupoService {


  /**
   * La direccion a donde hacer los pedidos al backend
 */
  URL_API = 'api/grupos';
  /**
   * El grupo a obtener
 */
  grupo: any;


   /**
 * Constructor
  * @param {HttpClient} http Conectar con el backend
 */
  constructor(private http: HttpClient) { 
    
  }

  /**
   * Obtiene todos los grupos
   * @return la respuesta del servidor
 */
  getGrupos() {
    return this.http.get(`${this.URL_API}`);
  }

  /**
   * Obtiene un grupo
   * @param {string} id El id del grupo a obtener
   * @return la respuesta del servidor
 */
  getGrupo(id: string){
    return this.http.get(`${this.URL_API}/${id}`);
  }

  /**
   * Crea un grupo
   * @param {Grupo} grupo El grupo a crear en la base de datos
   * @return la respuesta del servidor
 */
  createGrupo(grupo: Grupo) {
    this.http.post(`${this.URL_API}`, grupo).subscribe(res => console.log(res), err => console.log(err));
  }

  /**
   * Actualiza un grupo
   * @param {Grupo} grupo El grupo a actualizar
   * @param {string} id El id del grupo a actualizar
   * @return la respuesta del servidor
 */
  updateGrupo(grupo: Grupo, id: string): Observable<any> {
    return this.http.put(`${this.URL_API}/${id}`, grupo);
  }

  /**
   * Elimina un grupo
   * @param {string} id El id del grupo a eliminar
   * @return la respuesta del servidor
 */
  deleteGrupo(id: string){
    return this.http.delete(`${this.URL_API}/${id}`);
  }

  /**
   * Obtiene todos los grupos de un usuario
   * @param {string} codigo El codigo del grupo
   * @return la respuesta del servidor
 */
  getGruposCodigo(codigo: string){
    return this.http.get(`${this.URL_API}/${codigo}`).subscribe(res => console.log(res), err => console.log(err));
  }

  /**
   * Obtiene todos los grupos de un administrador
   * @param {string} id El id del administrador
   * @return la respuesta del servidor
 */
  getGruposAdministrador(id: string){
    return this.http.get(`${this.URL_API}/administrador/${id}`);
  }

  /**
   * Obtiene todos los grupos de un codigo
   * @param {string} codigo El codigo del grupo
   * @return la respuesta del servidor
 */
  getGrupoCodigo(codigo: string){
    return this.http.get(`${this.URL_API}/perteneces/${codigo}`);
  }

  /**
   * Obtiene al grupo 
   * @param {string} id El id del grupo
   * @return la respuesta del servidor
 */
  getGrupoDetalle(id: string){
    return this.http.get(`${this.URL_API}/detalle/${id}`).subscribe(res => {
      this.grupo = res;
    }, err => console.log(err));
  }
}
