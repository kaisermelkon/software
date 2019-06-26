import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Invitacion} from '../../models/Invitaciones';
import {Observable} from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class InvitacionService {

  invitacionId: any;
  invitacion: any;

  URL_API = 'http://localhost:3000/api/invitaciones';


  constructor(private http: HttpClient) { 
    this.invitacion=new Invitacion();
  }

  getInvitaciones() {
    return this.http.get(`${this.URL_API}`);
  }

  getInvitacion(id: string){
    
    return this.http.get(`${this.URL_API}/${id}`).subscribe(res => {
      this.invitacion = res;
    }, err => console.log(err));
  }

  createInvitacion(invitacion: Invitacion) {
    this.http.post(`${this.URL_API}`, invitacion).subscribe(res => console.log(res), err => console.log(err));
  }

  updateInvitacion(invitacion: Invitacion, id: string) {
    this.http.put(`${this.URL_API}/${id}`, invitacion).subscribe(res => console.log(res), err => console.log(err));
  }

  deleteInvitacion(id: string){
    return this.http.delete(`${this.URL_API}/${id}`).subscribe(res => console.log(res), err => console.log(err));;
  }

  getInvitacionesUsuario(usuarioExId: string) {
    return this.http.get(`${this.URL_API}/solicitud/${usuarioExId}`);
  }

}