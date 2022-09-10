import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import {RegisterComponent} from './register.component';
import {UserService} from "../../services/user/user.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {mockUser1} from "../../../mocks/mockUsers";
import {of, throwError} from "rxjs";
import {registerUserFailResponse, registerUserSuccessResponse} from "../../../mocks/mockResponses";
import {routes} from "../../app-routing.module";

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes(routes)],
      providers: [UserService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check if data is invalid', () => {
    component.userForm.setValue({
      userName: '',
      firstName: '',
      lastName: '',
      password: '',
      gender: '',
      dob: '',
      check: '',
      email: 'invalid'
    });
    expect(component.userForm.valid).toBeFalsy();
  });

  it('should check if data is valid', () => {
    component.userForm.setValue({
      userName: 'user',
      firstName: 'first',
      lastName: 'last',
      password: 'password',
      gender: 'male',
      dob: '2022-12-08',
      check: true,
      email: 'test@mail.com'
    });
    expect(component.userForm.valid).toBeTruthy();
  });

  it('should test the resetForm method', () => {
    component.resetForm();
    expect(component.userForm.untouched).toBeTrue();
  });

  it('should send data successfully', fakeAsync(() => {
    const formData = {
      userName: 'user',
      firstName: 'first',
      lastName: 'last',
      password: 'password',
      gender: 'male',
      dob: '2022-12-08',
      check: true,
      email: 'test@mail.com'
    };

    let userServiceSpy = spyOn(userService, 'registerUser').and.callThrough().and.returnValue(of(registerUserSuccessResponse));
    let subSpy = spyOn(userService.registerUser(mockUser1), 'subscribe').and.callThrough();

    component.userForm.setValue(formData);
    component.onSubmit();
    expect(userServiceSpy).toHaveBeenCalledBefore(subSpy);
    expect(subSpy).toHaveBeenCalled();
  }));

  it('should not send invalid data and throw error', fakeAsync(() => {
    const formData = {
      userName: '',
      firstName: '',
      lastName: '',
      password: '',
      gender: '',
      dob: '',
      check: false,
      email: ''
    };

    let userServiceSpy = spyOn(userService, 'registerUser').and.callThrough().and.returnValue(throwError(() => registerUserFailResponse));
    let subSpy = spyOn(userService.registerUser(mockUser1), 'subscribe').and.callThrough();

    component.userForm.setValue(formData);
    component.onSubmit();
    expect(userServiceSpy).toHaveBeenCalledBefore(subSpy);
    expect(subSpy).toHaveBeenCalled();
    expect(component.userForm.untouched).toBeTrue();
  }));
});
