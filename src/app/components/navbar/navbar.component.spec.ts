import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import {NavbarComponent} from './navbar.component';
import {AuthService} from "../../services/auth/auth.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {routes} from "../../app-routing.module";

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes(routes)],
      providers: [AuthService],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check the navbar component', fakeAsync(() => {
    let subSpy = spyOn(authService.status, 'subscribe').and.callThrough();
    authService.status.next("username");
    localStorage.setItem("token", "username")
    component.ngOnInit();
    expect(subSpy).toHaveBeenCalled();
    expect(component.username).toEqual("username");
    expect(component.loginStatus).toBeTrue();
    localStorage.clear();
  }));

  it('should call logout method', () => {
    let authServiceSpy = spyOn(authService, 'logout').and.callThrough();
    component.onLogout();
    expect(authServiceSpy).toHaveBeenCalled();
  });
});
