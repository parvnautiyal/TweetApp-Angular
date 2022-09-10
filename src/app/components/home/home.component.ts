import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user/user.service";
import {Subject} from "rxjs";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild("closeButton") closeButton;

  loginForm: FormGroup;
  forgotPasswordForm: FormGroup;
  forgotPasswordMode = false;
  forgotPasswordinvalidFormEmitter = new Subject<boolean>();
  forgotPasswordderrorMessageEmitter = new Subject<string>();
  invalidForm = false;
  errorMessage = '';
  status = new Subject<string>();

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.initForm();
    this.forgotPasswordinvalidFormEmitter.subscribe((data) => {
      this.invalidForm = data;
    });
    this.forgotPasswordderrorMessageEmitter.subscribe((data) => {
      this.errorMessage = data;
    });
    this.authService.errorMessageEmitter.subscribe((data) => {
      this.errorMessage = data;
    });
    this.authService.invalidFormEmitter.subscribe((data) => {
      this.invalidForm = data;
    })
    this.authService.logout();
  }

  onLogin() {
    this.authService.login(this.loginForm.value.username, this.loginForm.value.password, this.closeButton);
  }

  onForgotPassword() {
    this.userService.forgotPassword(this.forgotPasswordForm.value.email, this.forgotPasswordForm.value.newPassword)
      .subscribe({
        next: response => {
          alert(response.body);
          this.toggleForgotPasswordMode();
        },
        error: error => {
          console.error(error);
          this.forgotPasswordderrorMessageEmitter.next(error.error);
          this.forgotPasswordinvalidFormEmitter.next(true);
          this.forgotPasswordForm.reset();
        }
      });
  }

  toggleForgotPasswordMode() {
    this.forgotPasswordMode = !this.forgotPasswordMode;
    this.forgotPasswordForm.reset();
    this.loginForm.reset();
    this.errorMessage = '';
    this.invalidForm = false;
  }

  initForm() {

    let username = '';
    let password = '';

    let email = '';
    let newPassword = '';

    this.loginForm = new FormGroup({
      username: new FormControl(username, Validators.required),
      password: new FormControl(password, Validators.required)
    });

    this.forgotPasswordForm = new FormGroup({
      email: new FormControl(email, [Validators.required, Validators.email]),
      newPassword: new FormControl(newPassword, Validators.required)
    });
  }
}
