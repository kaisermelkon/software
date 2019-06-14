import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Carro} from '../../models/Carro';
import {Observable} from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CarroService {

  carroId: any;
  carro: any;

  URL_API = 'http://localhost:3000/api/carros';


  constructor(private http: HttpClient) { 
    this.carro=new Carro();
  }

  getCarros() {
    return this.http.get(`${this.URL_API}`);
  }

  getCarro(id: string){
    
    return this.http.get(`${this.URL_API}/${id}`).subscribe(res => {
      this.carro = res;
    }, err => console.log(err));
  }

  createCarro(carro: Carro) {
    this.http.post(`${this.URL_API}`, carro).subscribe(res => console.log(res), err => console.log(err));
  }

  updateCarro(carro: Carro, id: string) {
    return this.http.put(`${this.URL_API}/${id}`, carro).subscribe(res => console.log(res), err => console.log(err));;
  }

  deleteCarro(id: string){
    return this.http.delete(`${this.URL_API}/${id}`);
  }

  getCarroId(placa: string){
    return this.http.get(`${this.URL_API}/placa/${placa}`)
  }
}
