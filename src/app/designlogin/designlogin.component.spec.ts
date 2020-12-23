import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignloginComponent } from './designlogin.component';

describe('DesignloginComponent', () => {
  let component: DesignloginComponent;
  let fixture: ComponentFixture<DesignloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesignloginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
