import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private isOpen = false;
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const nombre = form.value.nombre;
    const direccion = form.value.direccion;
    const codigo = form.value.codigo;
  }

  Open() {
    this.isOpen = !this.isOpen;
  }

}
