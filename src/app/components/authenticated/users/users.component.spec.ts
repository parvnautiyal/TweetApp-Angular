import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import {UsersComponent} from './users.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {UserService} from "../../../services/user/user.service";
import {mockPipe} from "../../../../mocks/mockPipes";
import {mockUserArray} from "../../../../mocks/mockUsers";
import {of, throwError} from "rxjs";
import {allUsersResponseFail, allUsersResponseSuccess} from "../../../../mocks/mockResponses";

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersComponent, mockPipe({name: 'filter'}, mockUserArray)],
      imports: [HttpClientTestingModule, RouterTestingModule],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check if data is loaded', fakeAsync(() => {
    let userServiceSpy = spyOn(userService, 'showAllUsers').and.callThrough().and.returnValue(of(allUsersResponseSuccess));
    let subSpy = spyOn(userService.showAllUsers(), 'subscribe').and.callThrough();
    component.ngOnInit();
    expect(component.users.length).toEqual(mockUserArray.length);
    expect(userServiceSpy).toHaveBeenCalledBefore(subSpy);
    expect(subSpy).toHaveBeenCalled();
  }));

  it('should check if there is no data', fakeAsync(() => {
    let userServiceSpy = spyOn(userService, 'showAllUsers').and.callThrough().and.returnValue(throwError(() => allUsersResponseFail));
    let subSpy = spyOn(userService.showAllUsers(), 'subscribe').and.callThrough();
    component.ngOnInit();
    expect(component.users).toBeUndefined();
    expect(userServiceSpy).toHaveBeenCalledBefore(subSpy);
    expect(subSpy).toHaveBeenCalled();
  }));
});
