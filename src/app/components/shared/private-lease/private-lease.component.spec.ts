import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateLeaseComponent } from './private-lease.component';

describe('PrivateLeaseComponent', () => {
  let component: PrivateLeaseComponent;
  let fixture: ComponentFixture<PrivateLeaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivateLeaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateLeaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
