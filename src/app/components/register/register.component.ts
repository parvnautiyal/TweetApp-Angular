import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user/user.service";
import {Subject} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userForm: FormGroup;
  invalidFormEmitter = new Subject<boolean>();
  invalidForm = false;
  errorMessage = '';

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.initForm();
    this.invalidFormEmitter.subscribe((data) => {
      this.invalidForm = data;
    });
  }

  onSubmit() {
    this.userService.registerUser(this.userForm.value).subscribe({
      next: (response) => {
        console.log(response);
        this.invalidFormEmitter.next(false);
        alert("Successfully registered");
        this.router.navigate(['../home'], {relativeTo: this.route});
      },
      error: (error) => {
        console.table(error);
        this.errorMessage = error.error;
        this.userForm.reset();
        this.router.navigate(['../register'], {relativeTo: this.route});
        this.invalidFormEmitter.next(true);
      }
    });
  }

  initForm() {
    let userName = '';
    let firstName = '';
    let lastName = '';
    let email = '';
    let password = '';
    let gender = 'male';
    let dob = '';
    let check = false;

    this.userForm = new FormGroup({
      userName: new FormControl(userName, Validators.required),
      firstName: new FormControl(firstName, Validators.required),
      lastName: new FormControl(lastName, Validators.required),
      email: new FormControl(email, [Validators.required, Validators.email]),
      password: new FormControl(password, Validators.required),
      gender: new FormControl(gender, Validators.required),
      dob: new FormControl(dob, Validators.required),
      check: new FormControl(check, Validators.requiredTrue)
    });
  }

  resetForm() {
    this.userForm.reset();
  }

}
