import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SpeakerRequestModel } from 'src/app/models/speaker-request.model';
import { SpeakerResponseModel } from 'src/app/models/speaker-response.model';
import { SpeakerService } from 'src/app/services/speaker.service';
import { ToastsService } from 'src/app/services/toasts.service';
import { ErrorComponent } from '../../common/error/error.component';
import { ModeEnum } from '../../enums/ModeEnum';

@Component({
  selector: 'app-create-edit-view-speaker',
  templateUrl: './create-edit-view-speaker.component.html',
  styleUrls: ['./create-edit-view-speaker.component.scss']
})
export class CreateEditViewSpeakerComponent implements OnInit {
  @Input() mode: ModeEnum = ModeEnum.EDIT;
  @Input() speakerResponse!: SpeakerResponseModel;

  public speakerRequest: SpeakerRequestModel = new SpeakerRequestModel();

  public speakerForm!: FormGroup;
  public readOnly: boolean = false;

  readonly MODES = ModeEnum;

  public selectedFile: any;
  public event: any;
  public imgUrl: any;
  public receivedImageData: any;
  public base64Data: any;
  public convertedImage: any;

  constructor(
    private activeModal: NgbActiveModal,
    private speakerService: SpeakerService,
    private modal: NgbModal,
    private toastService: ToastsService
  ) {
    this.buildSpeakerForm();
  }

  ngOnInit(): void {
    switch (this.mode) {
      case ModeEnum.READ: {
        this.readOnly = true;
        this.fillForm();
        break;
      }
      case ModeEnum.NEW: {
        this.readOnly = false;
        this.speakerRequest = new SpeakerRequestModel();
        break;
      }
      case ModeEnum.EDIT: {
        this.readOnly = false;
        this.fillForm();
        break;
      }
    }
  }

  public onClickCloseModal() {
    this.activeModal.close();
  }

  public onClickCreateSpeaker() {
    this.speakerForm.markAllAsTouched();
    if (this.speakerForm.valid) {
      this.speakerRequest = this.fillModel();

      this.speakerService.post(this.speakerRequest).subscribe(
        () => {
          this.toastService.show('Success! Your speaker has been created successfully.', { classname: 'fw-bold bg-success text-light', delay: 5000 });
        }, (err: HttpErrorResponse) => {
          const modalRef = this.modal.open(ErrorComponent);

          if (err.status === 0) {
            modalRef.componentInstance.content = "Failed to create a speaker.";
            modalRef.componentInstance.subContent = "Please, try again later.";
          } else {
            modalRef.componentInstance.content = err.error.errorMessage;
          }
        }
      );

      this.activeModal.close();
    }
  }

  public onClickEditSpeaker() {
    this.speakerForm.markAllAsTouched();
    if (this.speakerForm.valid) {
      this.speakerRequest = this.fillModel();

      this.speakerService.patch(this.speakerRequest).subscribe(
        () => {
          this.toastService.show('Success! Your speaker has been updated successfully.', { classname: 'fw-bold bg-success text-light', delay: 5000 });
        }, (err: HttpErrorResponse) => {
          const modalRef = this.modal.open(ErrorComponent);

          if (err.status === 0) {
            modalRef.componentInstance.content = "Failed to update the speaker.";
            modalRef.componentInstance.subContent = "Please, try again later.";
          } else {
            modalRef.componentInstance.content = err.error.errorMessage;
          }
        }

      );
    }
    this.activeModal.close();
  }

  private buildSpeakerForm() {
    this.speakerForm = new FormGroup({
      'speakerName': new FormControl('', [Validators.required]),
      'description': new FormControl('', [Validators.required])
    })
  }

  private fillForm() {
    this.speakerForm.get('speakerName')!.setValue(this.speakerResponse?.speakerName);
    this.speakerForm.get('description')!.setValue(this.speakerResponse?.description);
  }

  private fillModel(): SpeakerRequestModel {
    this.speakerRequest!.id = this.speakerResponse?.id;
    this.speakerRequest!.speakerName = this.speakerForm.get('speakerName')!.value;
    this.speakerRequest!.description = this.speakerForm.get('description')!.value;
    this.speakerRequest!.owner = parseInt(localStorage.getItem('id')!);
    return this.speakerRequest;
  }
}
