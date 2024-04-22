import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomedeshComponent } from './homedesh.component';

describe('HomedeshComponent', () => {
  let component: HomedeshComponent;
  let fixture: ComponentFixture<HomedeshComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomedeshComponent]
    });
    fixture = TestBed.createComponent(HomedeshComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
