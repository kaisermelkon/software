import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../../../back-end/models/usuario.js';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  selectedUsuario: Usuario; 

  readonly URL_API = 'http://localhost:3000/api/usuarios';

  usuarios: Usuario[];

  constructor(private http: HttpClient) { 
    this.selectedUsuario = new Usuario();
  }

  getUsuarios() {
    return this.http.get(this.URL_API);
  }

  postUsuarios(usuario: Usuario) {
    this.http.post(this.URL_API, usuario);
  }

  putUsuario(usuario: Usuario){
    return this.http.put(this.URL_API + `/${usuario.id}`, usuario);
  }

  deleteUsuario(id: string){
    return this.http.delete(this.URL_API + `/${id}`);
  }
}
