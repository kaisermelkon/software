import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Grupo} from '../../models/Grupos';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {



  URL_API = 'http://localhost:3000/api/grupos';


  constructor(private http: HttpClient) { 
    
  }

  getGrupos() {
    return this.http.get(`${this.URL_API}`);
  }

  getGrupo(id: string){
    return this.http.get(`${this.URL_API}/${id}`);
  }

  createGrupo(grupo: Grupo) {
    this.http.post(`${this.URL_API}`, grupo).subscribe(res => console.log(res), err => console.log(err));
  }

  updateGrupo(grupo: Grupo, id: string): Observable<any> {
    return this.http.put(`${this.URL_API}/${id}`, grupo);
  }

  deleteGrupo(id: string){
    return this.http.delete(`${this.URL_API}/${id}`);
  }

  getGruposCodigo(codigo: string){
    return this.http.get(`${this.URL_API}/${codigo}`).subscribe(res => console.log(res), err => console.log(err));
  }

  getGruposAdministrador(id: string){
    return this.http.get(`${this.URL_API}/${id}`);
  }
}
