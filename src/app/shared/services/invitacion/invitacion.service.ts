import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Invitacion} from '../../models/Invitaciones';
import {Observable} from 'rxjs';


/**
   * Servicio de invitacion
 */
@Injectable({
  providedIn: 'root'
})
export class InvitacionService {

  /**
   * Id de una invitacion
 */
  invitacionId: any;
  /**
   * Una invitacion
 */
  invitacion: any;
  /**
   * La direccion a donde hacer los pedidos al backend
 */
  URL_API = 'http://localhost:3000/api/invitaciones';


   /**
 * Constructor
  * @param {HttpClient} http Conectar con el backend
 */
  constructor(private http: HttpClient) { 
    this.invitacion=new Invitacion();
  }

  /**
   * Obtiene todos las invitaciones
   * @return la respuesta del servidor
 */
  getInvitaciones() {
    return this.http.get(`${this.URL_API}`);
  }

  /**
   * Obtiene una invitacion
   * @param {string} id El id de la invitacion a obtener
   * @return la respuesta del servidor
 */
  getInvitacion(id: string){
    
    return this.http.get(`${this.URL_API}/${id}`).subscribe(res => {
      this.invitacion = res;
    }, err => console.log(err));
  }

  /**
   * Crea una invitacion
   * @param {Invitacion} invitacion La invitacion a crear en la base de datos
   * @return la respuesta del servidor
 */
  createInvitacion(invitacion: Invitacion) {
    this.http.post(`${this.URL_API}`, invitacion).subscribe(res => console.log(res), err => console.log(err));
  }

  /**
   * Actualiza una invitacion
   * @param {Invitacion} invitacion La invitacion a actualizar
   * @param {string} id El id de la invitacion a actualizar
   * @return la respuesta del servidor
 */
  updateInvitacion(invitacion: Invitacion, id: string) {
    this.http.put(`${this.URL_API}/${id}`, invitacion).subscribe(res => console.log(res), err => console.log(err));
  }

  /**
   * Elimina una invitacion
   * @param {string} id El id de la invitacion a eliminar
   * @return la respuesta del servidor
 */
  deleteInvitacion(id: string){
    return this.http.delete(`${this.URL_API}/${id}`).subscribe(res => console.log(res), err => console.log(err));;
  }

  /**
   * Obtiene todos las invitaciones de un usuario
   * @param {string} usuarioExId El id del usuario
   * @return la respuesta del servidor
 */
  getInvitacionesUsuario(usuarioExId: string) {
    return this.http.get(`${this.URL_API}/solicitud/${usuarioExId}`);
  }

}