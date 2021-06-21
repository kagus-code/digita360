import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TillnumberComponent } from './tillnumber.component';

describe('TillnumberComponent', () => {
  let component: TillnumberComponent;
  let fixture: ComponentFixture<TillnumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TillnumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TillnumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
