import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBillComponent } from './addbill.component';

describe('AddbillComponent', () => {
  let component: AddBillComponent;
  let fixture: ComponentFixture<AddBillComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddBillComponent]
    });
    fixture = TestBed.createComponent(AddBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
