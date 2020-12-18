import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NamecheckinghistoryComponent } from './namecheckinghistory.component';

describe('NamecheckinghistoryComponent', () => {
  let component: NamecheckinghistoryComponent;
  let fixture: ComponentFixture<NamecheckinghistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NamecheckinghistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NamecheckinghistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
