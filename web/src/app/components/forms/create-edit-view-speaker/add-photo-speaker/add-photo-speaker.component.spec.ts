import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPhotoSpeakerComponent } from './add-photo-speaker.component';

describe('AddPhotoSpeakerComponent', () => {
  let component: AddPhotoSpeakerComponent;
  let fixture: ComponentFixture<AddPhotoSpeakerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPhotoSpeakerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPhotoSpeakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
