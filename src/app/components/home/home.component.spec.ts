import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {HomeComponent} from './home.component';
import {UserService} from "../../services/user/user.service";
import {AuthService} from "../../services/auth/auth.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {of, throwError} from "rxjs";
import {forgotPasswordFailResponse, forgotPasswordSuccessResponse} from "../../../mocks/mockResponses";
import {routes} from "../../app-routing.module";

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let userService: UserService;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes(routes)],
      providers: [UserService, AuthService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check if login form data is valid', () => {
    component.loginForm.setValue({
      username: "user123",
      password: "password"
    });
    expect(component.loginForm.valid).toBeTruthy();
  });

  it('should check if login form data is invalid', () => {
    component.loginForm.setValue({
      username: "",
      password: ""
    });
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should test the method toggleForgotPasswordMode', () => {
    component.forgotPasswordMode = false;
    component.invalidForm = true;
    component.toggleForgotPasswordMode();
    expect(component.loginForm.untouched).toBeTrue();
    expect(component.forgotPasswordForm.untouched).toBeTrue();
    expect(component.forgotPasswordMode).toBeTrue();
    expect(component.invalidForm).toBeFalse();
  });

  it('should test login method', fakeAsync(() => {
    let authServiceSpy = spyOn(authService, 'login').and.callThrough();
    component.loginForm.setValue({
      username: "user123",
      password: "password"
    });
    component.onLogin();
    tick();
    expect(authServiceSpy).toHaveBeenCalled();
  }));

  it('should test forgot password method', fakeAsync(() => {
    let userServiceSpy = spyOn(userService, 'forgotPassword').and.callThrough().and.returnValue(of(forgotPasswordSuccessResponse));
    let subSpy = spyOn(userService.forgotPassword('email@email.com', 'newPassword'), 'subscribe').and.callThrough();
    component.forgotPasswordForm.setValue({
      email: 'email@email.com',
      newPassword: 'newPassword'
    });
    component.onForgotPassword();
    expect(userServiceSpy).toHaveBeenCalledBefore(subSpy);
    expect(subSpy).toHaveBeenCalled();
  }));

  it('should test forgot password method for error', fakeAsync(() => {
    let userServiceSpy = spyOn(userService, 'forgotPassword').and.callThrough().and.returnValue(throwError(() => forgotPasswordFailResponse));
    let subSpy = spyOn(userService.forgotPassword('email@email.com', 'newPassword'), 'subscribe').and.callThrough();

    component.forgotPasswordForm.setValue({
      email: 'email@email.com',
      newPassword: 'newPassword'
    });
    component.onForgotPassword();
    expect(userServiceSpy).toHaveBeenCalledBefore(subSpy);
    expect(subSpy).toHaveBeenCalled();
    expect(component.forgotPasswordForm.untouched).toBeTrue();
  }));

  it('should test subjects', fakeAsync(() => {
    let subSpy1 = spyOn(authService.errorMessageEmitter, 'subscribe');
    let subSpy2 = spyOn(authService.invalidFormEmitter, 'subscribe');
    authService.invalidFormEmitter.next(true);
    authService.errorMessageEmitter.next("error")
    component.ngOnInit();
    expect(subSpy1).toHaveBeenCalled();
    expect(subSpy2).toHaveBeenCalled();
    expect(component.errorMessage).toEqual("error");
    expect(component.invalidForm).toBeTrue();
  }));
});
