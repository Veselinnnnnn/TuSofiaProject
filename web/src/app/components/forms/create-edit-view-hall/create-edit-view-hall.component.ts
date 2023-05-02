import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HallRequestModel } from 'src/app/models/hall-request.model';
import { HallResponseModel } from 'src/app/models/hall-response.model';
import { HallService } from 'src/app/services/hall.service';
import { ToastsService } from 'src/app/services/toasts.service';
import { ErrorComponent } from '../../common/error/error.component';
import { ModeEnum } from '../../enums/ModeEnum';

@Component({
  selector: 'app-create-hall',
  templateUrl: './create-edit-view-hall.component.html',
  styleUrls: ['./create-edit-view-hall.component.scss']
})
export class CreateHallComponent implements OnInit {
  @Input() mode: ModeEnum = ModeEnum.EDIT;
  @Input() hallResponse!: HallResponseModel;
  @Input() addressId!: number;

  public hallRequest: HallRequestModel = new HallRequestModel();

  public hallForm!: FormGroup;
  public readOnly:boolean = false;

  readonly MODES = ModeEnum;

  constructor(
    private hallService:HallService,
    private activeModal: NgbActiveModal,
    private modal: NgbModal,
    private toastService:ToastsService
  ) {
    this.buildHallForm();
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
        this.hallRequest = new HallRequestModel();
        break;
      }
      case ModeEnum.EDIT: {
        this.readOnly = false;
        this.fillForm();
        break;
      }
    }
  }

  public onClickCreateHall(){
    this.hallForm.markAllAsTouched();
    if(this.hallForm.valid){
      this.hallRequest = this.fillModel();
      this.hallService.post(this.hallRequest).subscribe(
        (response:HallResponseModel)=>{
          this.toastService.show('Success! Your hall has been created successfully.', { classname: 'fw-bold bg-success text-light', delay: 5000 });
        }, (err: HttpErrorResponse) => {
          const modalRef = this.modal.open(ErrorComponent);
          
          if (err.status === 0) {
            modalRef.componentInstance.content = "Failed to create a hall.";
            modalRef.componentInstance.subContent = "Please, try again later.";
          } else {
            modalRef.componentInstance.content = err.error.errorMessage;
          }
        }
      );
    }
    this.activeModal.close();
  }

  public onClickCloseModal() {
    this.activeModal.close();
  }

  public onClickEditHall(){
    this.hallForm.markAllAsTouched();
    if (this.hallForm.valid) {
      this.hallRequest = this.fillModel();
      this.hallService.patch(this.hallRequest).subscribe(
        () => { 
          this.toastService.show('Success! Your hall has been updated successfully.', { classname: 'fw-bold bg-success text-light', delay: 5000 });
        }, (err: HttpErrorResponse) => {
          const modalRef = this.modal.open(ErrorComponent);
          
          if (err.status === 0) {
            modalRef.componentInstance.content = "Failed to update the session.";
            modalRef.componentInstance.subContent = "Please, try again later.";
          } else {
            modalRef.componentInstance.content = err.error.errorMessage;
          }
        }
      );
    }
    this.activeModal.close();
  }


  private buildHallForm():void{
    this.hallForm = new FormGroup({
      'name' : new FormControl(null,[Validators.required]),
      'seatCapacity': new FormControl(null,[Validators.required])
    })
  } 

  private fillForm(): void {
    this.hallForm.get('name')!.setValue(this.hallResponse?.name);
    this.hallForm.get('seatCapacity')!.setValue(this.hallResponse?.seatCapacity);
  }

  private fillModel(): HallRequestModel{
    this.hallRequest!.id = this.hallResponse?.id;
    this.hallRequest!.name = this.hallForm.get('name')!.value;
    this.hallRequest!.seatCapacity = this.hallForm.get('seatCapacity')!.value;
    this.hallRequest!.address = this.addressId;
    this.hallRequest!.owner = parseInt(localStorage.getItem('id')!);
    return this.hallRequest;
  }
}
