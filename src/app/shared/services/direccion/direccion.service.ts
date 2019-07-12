import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Direccion} from '../../models/Direccion';
import {Observable} from 'rxjs';


/**
   * Servicio de direccion
 */
@Injectable({
  providedIn: 'root'
})
export class DireccionService {

  /**
   * Id de la direccion
 */
  direccionId: any;
  /**
   * Direccion
 */
  direccion: any;

  /**
   * La direccion a donde hacer los pedidos al backend
 */
  URL_API = 'api/direcciones';


   /**
 * Constructor
  * @param {HttpClient} http Conectar con el backend
 */
  constructor(private http: HttpClient) { 
    this.direccion=new Direccion();
  }

  /**
   * Obtiene todas las direcciones
   * @return la respuesta del servidor
 */
  getDirecciones() {
    return this.http.get(`${this.URL_API}`);
  }

  /**
   * Obtiene una direccion
   * @param {string} id El id de la direccion a obtener
   * @return la respuesta del servidor
 */
  getDireccion(id: string){
    
    return this.http.get(`${this.URL_API}/${id}`).subscribe(res => {
      this.direccion = res;
    }, err => console.log(err));
  }

  /**
   * Crea una direccion
   * @param {Direccion} direccion La direccion a crear en la base de datos
   * @return la respuesta del servidor
 */
  createDireccion(direccion: Direccion) {
    this.http.post(`${this.URL_API}`, direccion).subscribe(res => console.log(res), err => console.log(err));
  }

  /**
   * Actualiza una direccion
   * @param {Direccion} direccion La direccion a actualizar
   * @param {string} id El id de la direccion a actualizar
   * @return la respuesta del servidor
 */
  updateDireccion(direccion: Direccion, id: string) {
    this.http.put(`${this.URL_API}/${id}`, direccion).subscribe(res => console.log(res), err => console.log(err));
  }

  /**
   * Elimina una direccion
   * @param {string} id El id de la direccion a eliminar
   * @return la respuesta del servidor
 */
  deleteDireccion(id: string){
    return this.http.delete(`${this.URL_API}/${id}`);
  }

  /**
   * Obtiene el id de una direccion
   * @param {string} municipio El municipio donde se encuentra
   * @param {string} urbanizacion La urbanizacion donde se encuentra
   * @param {string} descripcion La descripcion de la direccion
   * @return la respuesta del servidor
 */
  getDireccionId(municipio: string, urbanizacion: string, descripcion: string){
    return this.http.get(`${this.URL_API}/${municipio}/${urbanizacion}/${descripcion}`)
  }
}
