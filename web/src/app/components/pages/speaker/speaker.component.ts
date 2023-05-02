import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SpeakerResponseModel } from 'src/app/models/speaker-response.model';
import { RequestService } from 'src/app/services/request.service';
import { SpeakerService } from 'src/app/services/speaker.service';
import { DeleteComponent } from '../../common/delete/delete.component';
import { ErrorComponent } from '../../common/error/error.component';
import { ModeEnum } from '../../enums/ModeEnum';
import { AddPhotoSpeakerComponent } from '../../forms/create-edit-view-speaker/add-photo-speaker/add-photo-speaker.component';
import { CreateEditViewSpeakerComponent } from '../../forms/create-edit-view-speaker/create-edit-view-speaker.component';

@Component({
  selector: 'app-speaker',
  templateUrl: './speaker.component.html',
  styleUrls: ['./speaker.component.scss']
})
export class SpeakerComponent implements OnInit {
  public speakerResponse!: SpeakerResponseModel[];

  public page: number = 1;
  public size: number = 10;
  public totalElements: number = 0;

  constructor(
    private modal: NgbModal,
    private requestService: RequestService,
    private speakerService: SpeakerService,
  ) { }

  ngOnInit(): void {
    this.getAllSpeakers();
    this.requestService.RefreshAfterRequest.subscribe(
      response => {
        this.getAllSpeakers();
      }
    )
    this.speakerService.RefreshAfterRequest.subscribe(
      response => {
        this.getAllSpeakers();
      }
    )
  }

  public getAllSpeakers() {
    const params = new HttpParams().set("size", this.size).set("page", this.page);

    this.speakerService.getAll(params).subscribe(
      response => {
        this.speakerResponse = response.content;
        for (var i = 0; i < response.content.length; i++) { 
          this.speakerService.getImage(response.content[i].id).subscribe();
        }
      }, (err: HttpErrorResponse) => {
        const modalRef = this.modal.open(ErrorComponent);

        if (err.status === 0) {
          modalRef.componentInstance.content = "Failed to load list.";
          modalRef.componentInstance.subContent = "Please, try again later.";
        } else {
          modalRef.componentInstance.content = err.error.errorMessage;
        }
      }
    );
  }

  public checkOwner(speaker: SpeakerResponseModel) {
    if (speaker.owner.id === parseInt(localStorage.getItem('id')!)) {
      return true;
    }
    return false;
  }

  public onClickAddSpeaker() {
    const modalRef = this.modal.open(CreateEditViewSpeakerComponent, { centered: true });
    modalRef.componentInstance.mode = ModeEnum.NEW;
  }

  public onClickUpdateSpeaker(speaker: SpeakerResponseModel) {
    if (this.checkOwner(speaker)) {
      const modalRef = this.modal.open(CreateEditViewSpeakerComponent, { centered: true });
      modalRef.componentInstance.mode = ModeEnum.EDIT;
      modalRef.componentInstance.speakerResponse = speaker;
    } else {
      const modalRef = this.modal.open(ErrorComponent);
      modalRef.componentInstance.content = "You dont have permission to update this speaker!";
      modalRef.componentInstance.subContent = "Only the creator can update it.";
    }
  }

  public viewSpeakerInfo(speaker: SpeakerResponseModel) {
    const modalRef = this.modal.open(CreateEditViewSpeakerComponent, { centered: true });
    modalRef.componentInstance.speakerResponse = speaker;
    modalRef.componentInstance.mode = ModeEnum.READ;
  }

  public onClickDelete(speaker: SpeakerResponseModel) {
    if (this.checkOwner(speaker)) {
      const modalRef = this.modal.open(DeleteComponent);
      modalRef.componentInstance.url = SpeakerResponseModel.url;
      modalRef.componentInstance.id = speaker.id;
    } else {
      const modalRef = this.modal.open(ErrorComponent);
      modalRef.componentInstance.content = "You dont have permission to delete this speaker!";
      modalRef.componentInstance.subContent = "Only the creator can delete it.";
    }
  }
}
