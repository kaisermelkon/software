import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Direccion} from '../../models/Direccion';
import {Observable} from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class DireccionService {

  direccionId: any;
  direccion: any;

  URL_API = 'http://localhost:3000/api/direcciones';


  constructor(private http: HttpClient) { 
    this.direccion=new Direccion();
  }

  getDirecciones() {
    return this.http.get(`${this.URL_API}`);
  }

  getDireccion(id: string){
    
    return this.http.get(`${this.URL_API}/${id}`).subscribe(res => {
      this.direccion = res;
    }, err => console.log(err));
  }

  createDireccion(direccion: Direccion) {
    this.http.post(`${this.URL_API}`, direccion).subscribe(res => console.log(res), err => console.log(err));
  }

  updateDireccion(direccion: Direccion, id: string) {
    this.http.put(`${this.URL_API}/${id}`, direccion).subscribe(res => console.log(res), err => console.log(err));
  }

  deleteDireccion(id: string){
    return this.http.delete(`${this.URL_API}/${id}`);
  }

  getDireccionId(municipio: string, urbanizacion: string, descripcion: string){
    return this.http.get(`${this.URL_API}/${municipio}/${urbanizacion}/${descripcion}`)
  }
}
