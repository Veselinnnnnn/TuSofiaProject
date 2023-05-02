import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddressResponseModel } from 'src/app/models/address-response.model';
import { AddressService } from 'src/app/services/address.service';
import { RequestService } from 'src/app/services/request.service';
import { DeleteComponent } from '../../common/delete/delete.component';
import { ErrorComponent } from '../../common/error/error.component';
import { ModeEnum } from '../../enums/ModeEnum';
import { CreateAddressComponent } from '../../forms/create-edit-view-address/create-edit-view-address.component';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit{
  public addresses: AddressResponseModel[] = [];
  public page: number = 1;
  public size: number = 10;
  public totalElements: number = 0;

  constructor(
    private requestService:RequestService,
    private addressService:AddressService,
    private modal: NgbModal,
    private router: Router
  ){}

  ngOnInit(): void {
    this.getAllAddresses();
    this.requestService.RefreshAfterRequest.subscribe(response => {
      this.getAllAddresses();
    })
    this.addressService.RefreshAfterRequest.subscribe(response => { 
      this.getAllAddresses();
    })
  }  

  public getAllAddresses(){
    var params = new HttpParams().set('size', this.size).set('page',this.page);
    
    this.addressService.getAll(params).subscribe(
      response => {
        this.addresses = response.content;
        this.totalElements = response.totalElements;
      },(err: HttpErrorResponse) => {
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

  private checkOwner(address: AddressResponseModel) {
    console.log(address)
    if (address.owner.id === parseInt(localStorage.getItem('id')!)) {
      return true;
    }
    return false;
  }

  public onClickDelete(address: AddressResponseModel){
    if (this.checkOwner(address)) {
      const modalRef = this.modal.open(DeleteComponent);
      modalRef.componentInstance.url = AddressResponseModel.url;
      modalRef.componentInstance.id = address.id;
    } else {
      const modalRef = this.modal.open(ErrorComponent);
      modalRef.componentInstance.content = "You dont have permission to delete this address!";
      modalRef.componentInstance.subContent = "Only the creator can delete it.";
    }
  }

  public onClickViewAddressInfo(address: AddressResponseModel) {
    const modalRef = this.modal.open(CreateAddressComponent,{centered:true});
    modalRef.componentInstance.addressResponse = address;
    modalRef.componentInstance.mode = ModeEnum.READ;
  }

  public onClickAddAddress(){
    const modalRef = this.modal.open(CreateAddressComponent,{centered:true});
    modalRef.componentInstance.mode = ModeEnum.NEW;
  }

  public onClickUpdateAddress(address: AddressResponseModel) {
    console.log(address);
    if (this.checkOwner(address)) {
      const modalRef = this.modal.open(CreateAddressComponent, { centered: true });
      modalRef.componentInstance.mode = ModeEnum.EDIT;
      modalRef.componentInstance.addressResponse = address;
    } else {
      const modalRef = this.modal.open(ErrorComponent);
      modalRef.componentInstance.content = "You dont have permission to update this address!";
      modalRef.componentInstance.subContent = "Only the creator can update it.";
    }
  }

  public onClickNavigateToHalls(address:AddressResponseModel){
    this.router.navigateByUrl('/halls',{state:{address:address, signedIn: true}});
  }
}
