import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Perteneces} from '../../models/Perteneces';
import {Observable} from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class PertenecesService {

  perteneces: any;

  URL_API = 'http://localhost:3000/api/perteneces';


  constructor(private http: HttpClient) { 
   
  }

  getUsuarios() {
    return this.http.get(`${this.URL_API}`);
  }

  async getPerteneces(id: string){
    return this.http.get(`${this.URL_API}/${id}`).subscribe(res => {
      this.perteneces = res;
    }, err => console.log(err));
  }

  async createPerteneces(perteneces: Perteneces) {
    this.http.post(`${this.URL_API}`, perteneces).subscribe(res => console.log(res), err => console.log(err));
  }

  updatePerteneces(perteneces: Perteneces, id: string): Observable<any> {
    return this.http.put(`${this.URL_API}/${id}`, perteneces);
  }

  deletePerteneces(id: string){
    return this.http.delete(`${this.URL_API}/${id}`).subscribe(res => console.log(res), err => console.log(err));;
  }

  getPerGrupos(usuarioId: string){
    return this.http.get(`${this.URL_API}/perGrupos/${usuarioId}`);
  }

  getPerUsuarios(grupoId: string){
    return this.http.get(`${this.URL_API}/perUsuarios/${grupoId}`);
  }

  getPerUsuariosGrupos(grupoId: string, usuarioId: string){
    return this.http.get(`${this.URL_API}/perteneces/${grupoId}/${usuarioId}`);
  }

  getPerUsuariosGruposBoolean(grupoId: string, usuarioId: string){
    return this.http.get(`${this.URL_API}/perteneces/boolean/${grupoId}/${usuarioId}`);
  }

}
