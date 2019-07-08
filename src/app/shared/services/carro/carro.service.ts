import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Carro} from '../../models/Carro';
import {Observable} from 'rxjs';


/**
   * Servicio Carro
 */
@Injectable({
  providedIn: 'root'
})
export class CarroService {

  /**
   * El id del carro
 */
  carroId: any;
  /**
   * El carro
 */
  carro: any;
  /**
   * La direccion a donde hacer los pedidos al backend
 */
  URL_API = 'http://localhost:3000/api/carros';


   /**
 * Constructor
  * @param {HttpClient} http Conectar con el backend
 */
  constructor(private http: HttpClient) { 
    this.carro=new Carro();
  }

  /**
   * Obtiene todos los carros
   * @return la respuesta del servidor
 */
  getCarros() {
    return this.http.get(`${this.URL_API}`);
  }

  /**
   * Obtiene un carro
   * @param {string} id El id del carro a obtener
   * @return la respuesta del servidor
 */
  getCarro(id: string){
    
    return this.http.get(`${this.URL_API}/${id}`).subscribe(res => {
      this.carro = res;
    }, err => console.log(err));
  }

  /**
   * Crea un carro
   * @param {Carro} carro El carro a crear en la base de datos
   * @return la respuesta del servidor
 */
  createCarro(carro: Carro) {
    this.http.post(`${this.URL_API}`, carro).subscribe(res => console.log(res), err => console.log(err));
  }


  /**
   * Actualiza un carro
   * @param {Carro} carro El carro a actualizar
   * @param {string} id El id del carro a actualizar
   * @return la respuesta del servidor
 */
  updateCarro(carro: Carro, id: string) {
    return this.http.put(`${this.URL_API}/${id}`, carro).subscribe(res => console.log(res), err => console.log(err));
  }

   /**
   * Elimina un carro
   * @param {string} id El id del carro a eliminar
   * @return la respuesta del servidor
 */
  deleteCarro(id: string){
    return this.http.delete(`${this.URL_API}/${id}`);
  }

   /**
   * Obtiene el id de un carro
   * @param {string} placa La placa del carro
   * @return la respuesta del servidor
 */
  getCarroId(placa: string){
    return this.http.get(`${this.URL_API}/placa/${placa}`)
  }
}
