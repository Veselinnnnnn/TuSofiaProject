import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditViewSpeakerComponent } from './create-edit-view-speaker.component';

describe('CreateEditViewSpeakerComponent', () => {
  let component: CreateEditViewSpeakerComponent;
  let fixture: ComponentFixture<CreateEditViewSpeakerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditViewSpeakerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditViewSpeakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
