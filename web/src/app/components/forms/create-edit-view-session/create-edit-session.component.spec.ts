import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditViewSessionComponent } from './create-edit-session.component';

describe('CreateEditViewSessionComponent', () => {
  let component: CreateEditViewSessionComponent;
  let fixture: ComponentFixture<CreateEditViewSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditViewSessionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditViewSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
