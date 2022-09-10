import {TestBed} from '@angular/core/testing';

import {AuthGuard} from './auth.guard';
import {Router} from "@angular/router";

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let routeMock: any = {snapshot: {}};
  let routeStateMock: any = {snapshot: {}, url: '/dashboard/tweets'};
  let routerMock = {navigate: jasmine.createSpy('navigate')};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard, {provide: Router, useValue: routerMock}],
    });
    guard = TestBed.inject(AuthGuard);
    window.localStorage.clear();
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should redirect an unauthenticated user to the home route', () => {
    expect(guard.canActivate(routeMock, routeStateMock)).toEqual(false);
  });

  it('should redirect an authenticated user to the dashboard route', () => {
    window.localStorage.setItem('token', 'username');
    expect(guard.canActivate(routeMock, routeStateMock)).toEqual(true);
  });

  it('should redirect an unauthenticated user to the home route', () => {
    expect(guard.canActivateChild(routeMock, routeStateMock)).toEqual(false);
  });

  it('should redirect an authenticated user to the child route', () => {
    window.localStorage.setItem('token', 'username');
    expect(guard.canActivateChild(routeMock, routeStateMock)).toEqual(true);
  });
});
