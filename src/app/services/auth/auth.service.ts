import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {UserService} from "../user/user.service";
import {ActivatedRoute, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  invalidFormEmitter = new Subject<boolean>();
  errorMessageEmitter = new Subject<string>();
  status = new Subject<string>();

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {
  }

  login(username, password, button: any) {
    this.userService.loginUser(username, password)
      .subscribe({
        next: response => {
          if (response.status === 200) {
            console.log(response);
            localStorage.setItem("token", username);
            this.status.next(localStorage.getItem("token"));
            button.nativeElement.click();
            this.router.navigate(['/dashboard']);
          }
        },
        error: error => {
          console.error(error);
          this.errorMessageEmitter.next(error.error);
          this.invalidFormEmitter.next(true);
        }
      });
  }

  logout() {
    localStorage.removeItem("token");
    this.status.next(localStorage.getItem("token"));
    this.router.navigate(['/home']);
  }
}
