import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ErrorPageComponent} from './error-page.component';
import {By} from "@angular/platform-browser";
import {Location} from "@angular/common";

describe('ErrorPageComponent', () => {
  let component: ErrorPageComponent;
  let fixture: ComponentFixture<ErrorPageComponent>;
  let loc: Location;

  const locationStub = {
    back: jasmine.createSpy('back')
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ErrorPageComponent],
      providers: [
        {provide: Location, useValue: locationStub},
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorPageComponent);
    component = fixture.componentInstance;
    loc = fixture.debugElement.injector.get(Location);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test back functionality', () => {
    spyOn(component, 'back');
    let btn = fixture.debugElement.query(By.css('button'));
    btn.triggerEventHandler('click', null);
    expect(component.back).toHaveBeenCalled();
  });

  it('should go back', () => {
    component.back();
    expect(loc.back).toHaveBeenCalled();
  });
});
