import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustbillComponent } from './custbill.component';

describe('CustbillComponent', () => {
  let component: CustbillComponent;
  let fixture: ComponentFixture<CustbillComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustbillComponent]
    });
    fixture = TestBed.createComponent(CustbillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
