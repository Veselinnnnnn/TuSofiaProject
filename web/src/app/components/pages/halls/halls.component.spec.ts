import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HallsComponent } from './halls.component';

describe('HallsComponent', () => {
  let component: HallsComponent;
  let fixture: ComponentFixture<HallsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HallsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
