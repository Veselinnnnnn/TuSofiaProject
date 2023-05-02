import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddressRequestModel } from 'src/app/models/address-request.model';
import { AddressResponseModel } from 'src/app/models/address-response.model';
import { AddressService } from 'src/app/services/address.service';
import { RequestService } from 'src/app/services/request.service';
import { ToastsService } from 'src/app/services/toasts.service';
import { ErrorComponent } from '../../common/error/error.component';
import { ModeEnum } from '../../enums/ModeEnum';

@Component({
  selector: 'app-create-address',
  templateUrl: './create-edit-view-address.component.html',
  styleUrls: ['./create-edit-view-address.component.scss']
})
export class CreateAddressComponent implements OnInit {  
  @Output() addressId: EventEmitter<any> = new EventEmitter();
  @Input() mode: ModeEnum = ModeEnum.EDIT;
  @Input() addressResponse!: AddressResponseModel;

  public addressRequest: AddressRequestModel = new AddressRequestModel();

  public addressForm!: FormGroup;
  public readOnly: boolean = false;

  readonly MODES = ModeEnum;

  constructor(
    private addressService: AddressService,
    private modalActive: NgbActiveModal,
    private modal: NgbModal,
    private toastService: ToastsService
  ) {
    this.buildAddressForm();
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
        this.addressRequest = new AddressRequestModel();
        break;
      }
      case ModeEnum.EDIT: {
        this.readOnly = false;
        this.fillForm();
        break;
      }
    }
  }

  public onClickCreateAddress() {
    this.addressForm.markAllAsTouched();
    if (this.addressForm.valid) {
      
      this.addressRequest = this.fillModel();

      this.addressService.post(this.addressRequest).subscribe(
        (response: AddressResponseModel) => {
          this.addressId.emit(response.id);

          this.toastService.show('Success! Your address has been created successfully.', { classname: 'fw-bold bg-success text-light', delay: 5000 });
          
        }, (err: HttpErrorResponse) => {
          const modalRef = this.modal.open(ErrorComponent);
          
          if (err.status === 0) {
            modalRef.componentInstance.content = "Failed to create an address.";
            modalRef.componentInstance.subContent = "Please, try again later.";
          } else {
            modalRef.componentInstance.content = err.error.errorMessage;
          }
        }
      );

      this.modalActive.close();
    }
  }

  public onClickEditAddress() {
    this.addressForm.markAllAsTouched();

    if (this.addressForm.valid) {

      this.addressRequest = this.fillModel();
      console.log(this.addressRequest);
        this.addressService.patch(this.addressRequest).subscribe(
        () => { 
          this.toastService.show('Success! Your address has been updated successfully.', { classname: 'fw-bold bg-success text-light', delay: 5000 });
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

    this.modalActive.close();
  }

  public onClickCloseModal() {
    this.modalActive.close();
  }

  private buildAddressForm(): void {
    this.addressForm = new FormGroup({
      'addressName': new FormControl('', [Validators.required])
    })
  }

  private fillModel(): AddressRequestModel {
    this.addressRequest!.id = this.addressResponse?.id;
    this.addressRequest!.addressName = this.addressForm.get('addressName')!.value;
    this.addressRequest!.owner = parseInt(localStorage.getItem('id')!);
    return this.addressRequest;
  }

  private fillForm(): void {
    this.addressForm.get('addressName')!.setValue(this.addressResponse?.addressName);
  }
}
