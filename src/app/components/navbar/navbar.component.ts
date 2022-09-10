import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loginStatus: boolean;
  username: string;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.status.subscribe({
      next: (response) => {
        if (response !== null) {
          this.loginStatus = true;
          this.username = response;
        } else this.loginStatus = false;
      }
    });
    const value = localStorage.getItem("token");
    if (value) {
      this.loginStatus = true;
      this.username = value;
    } else {
      this.loginStatus = false;
    }
  }

  onLogout() {
    this.authService.logout();
  }
}
