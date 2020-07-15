/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AggrementComponent } from './aggrement.component';

describe('AggrementComponent', () => {
  let component: AggrementComponent;
  let fixture: ComponentFixture<AggrementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AggrementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AggrementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
