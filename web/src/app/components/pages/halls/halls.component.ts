import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddressResponseModel } from 'src/app/models/address-response.model';
import { HallResponseModel } from 'src/app/models/hall-response.model';
import { HallService } from 'src/app/services/hall.service';
import { RequestService } from 'src/app/services/request.service';
import { DeleteComponent } from '../../common/delete/delete.component';
import { ErrorComponent } from '../../common/error/error.component';
import { ModeEnum } from '../../enums/ModeEnum';
import { CreateHallComponent } from '../../forms/create-edit-view-hall/create-edit-view-hall.component';

@Component({
  selector: 'app-halls',
  templateUrl: './halls.component.html',
  styleUrls: ['./halls.component.scss']
})
export class HallsComponent implements OnInit {
  public address: AddressResponseModel = window.history.state.address;
  public halls: HallResponseModel[] = [];

  public page: number = 1;
  public size: number = 10;
  public totalElements: number = 0;

  constructor(
    private hallService: HallService,
    private requestService: RequestService,
    private modal: NgbModal
  ) { }

  ngOnInit(): void {
    this.getAllHallsByAddressId();
    this.hallService.RefreshAfterRequest.subscribe(
      response => {
        this.getAllHallsByAddressId();
      }
    )
    this.requestService.RefreshAfterRequest.subscribe(
      response => {
        this.getAllHallsByAddressId();
      }
    )
  }

  private checkOwner(ownerId: number) {
    if (ownerId === parseInt(localStorage.getItem('id')!)) {
      return true;
    }
    return false;
  }

  public getAllHallsByAddressId() {
    var params = new HttpParams().set('size', this.size).set('page', this.page).set('data', this.address.id);

    this.hallService.getAllById(params).subscribe(
      response => {
        this.halls = response.content;
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

  public onClickUpdateHall(hall: HallResponseModel) {
    if (this.checkOwner(hall.owner.id)) {
      const modalRef = this.modal.open(CreateHallComponent, { centered: true });
      modalRef.componentInstance.mode = ModeEnum.EDIT;
      modalRef.componentInstance.hallResponse = hall;
      modalRef.componentInstance.addressId = this.address.id;
    } else {
      const modalRef = this.modal.open(ErrorComponent);
      modalRef.componentInstance.content = "You dont have permission to update this hall!";
      modalRef.componentInstance.subContent = "Only the creator can update it.";
    }
  }

  public viewHallInfo(hall: HallResponseModel) {
    const modalRef = this.modal.open(CreateHallComponent, { centered: true });
    modalRef.componentInstance.hallResponse = hall;
    modalRef.componentInstance.mode = ModeEnum.READ;
  }

  public addHallToAddress() {
    if (this.checkOwner(this.address.owner.id)) {
      const modalRef = this.modal.open(CreateHallComponent, { centered: true });
      modalRef.componentInstance.addressId = this.address.id;
      modalRef.componentInstance.mode = ModeEnum.NEW;
      modalRef.componentInstance.addressId = this.address.id;
    } else {
      const modalRef = this.modal.open(ErrorComponent);
      modalRef.componentInstance.content = "You dont have permission to add hall to this address!";
      modalRef.componentInstance.subContent = "Only the creator can make changes.";
    }
  }

  public onClickDelete(hall: HallResponseModel) {
    if (this.checkOwner(hall.owner.id)) {
      const modalRef = this.modal.open(DeleteComponent);
      modalRef.componentInstance.url = HallResponseModel.url;
      modalRef.componentInstance.id = hall.id;
    } else {
      const modalRef = this.modal.open(ErrorComponent);
      modalRef.componentInstance.content = "You dont have permission to delete this hall!";
      modalRef.componentInstance.subContent = "Only the creator can delete it.";
    }
  }
}
