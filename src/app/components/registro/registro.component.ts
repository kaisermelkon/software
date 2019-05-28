import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(protected authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm){
    const email=form.value.email;
    const password1=form.value.password;
    const password2=form.value.password2;
    console.log("hello");
    if(password1 === password2){
      console.log("hello");
      this.authService.signUpUser(email, password1);
      
    }
  }

}
