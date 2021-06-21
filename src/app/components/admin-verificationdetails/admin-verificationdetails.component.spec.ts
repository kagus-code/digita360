import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVerificationdetailsComponent } from './admin-verificationdetails.component';

describe('AdminVerificationdetailsComponent', () => {
  let component: AdminVerificationdetailsComponent;
  let fixture: ComponentFixture<AdminVerificationdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminVerificationdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminVerificationdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
