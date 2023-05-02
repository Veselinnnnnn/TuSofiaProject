import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHallComponent } from './create-edit-view-hall.component';

describe('CreateHallComponent', () => {
  let component: CreateHallComponent;
  let fixture: ComponentFixture<CreateHallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateHallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateHallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
