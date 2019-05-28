import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private isOpen = false;
  constructor(protected authService: AuthService) { 
    console.log(this.authService.token+"hello");
  }

  ngOnInit() {
  }

  Open() {
    this.isOpen = !this.isOpen;
  }

}
