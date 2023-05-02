import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SpeakerResponseModel } from 'src/app/models/speaker-response.model';
import { SpeakerService } from 'src/app/services/speaker.service';

@Component({
  selector: 'app-add-photo-speaker',
  templateUrl: './add-photo-speaker.component.html',
  styleUrls: ['./add-photo-speaker.component.scss']
})
export class AddPhotoSpeakerComponent {
  @Input() speaker!: SpeakerResponseModel;

  public url = 'asd';
  public temp:boolean = window.history.state.temp;
  public croppedImage = "";

  public file!: File;

  constructor(
    private speakerService: SpeakerService,
    private activeModal: NgbActiveModal
  ) { }
  
  public onSelectFile(event: any) {
    this.url = event;
    this.file = event.target.files[0];
    this.temp = false;
  }

  public cropImage(event: any) {
    var croppedImage = event.base64;
  }

  public onClickSaveData() {
    const uploadImageData = new FormData();
    uploadImageData.append('file', this.file);

    this.speakerService.addImage(uploadImageData, this.speaker.id).subscribe();

    this.activeModal.close();
  }
}