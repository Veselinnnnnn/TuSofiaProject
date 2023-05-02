import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyScheduleComponent } from './daily-schedule.component';

describe('DailyScheduleComponent', () => {
  let component: DailyScheduleComponent;
  let fixture: ComponentFixture<DailyScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyScheduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
