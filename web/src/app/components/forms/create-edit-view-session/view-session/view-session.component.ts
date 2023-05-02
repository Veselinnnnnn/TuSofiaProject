import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorComponent } from 'src/app/components/common/error/error.component';
import { ModeEnum } from 'src/app/components/enums/ModeEnum';
import { AddressResponseModel } from 'src/app/models/address-response.model';
import { HallResponseModel } from 'src/app/models/hall-response.model';
import { SessionRequestModel } from 'src/app/models/session-request.model';
import { SessionResponseModel } from 'src/app/models/session-response.model';
import { SpeakerResponseModel } from 'src/app/models/speaker-response.model';
import { UserModel } from 'src/app/models/user.model';
import { AddressService } from 'src/app/services/address.service';
import { HallService } from 'src/app/services/hall.service';
import { SessionService } from 'src/app/services/session.service';
import { SpeakerService } from 'src/app/services/speaker.service';
import { ToastsService } from 'src/app/services/toasts.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-session',
  templateUrl: './view-session.component.html',
  styleUrls: ['./view-session.component.scss']
})
export class ViewSessionComponent implements OnInit{
  @Input() sessionResponse!: SessionResponseModel;
  @Input() date!: Date;
  public startTime!: string;
  public endTime!: string;
  public mode!: ModeEnum;
  public MODES = ModeEnum;
  public sessionRequest: SessionRequestModel = new SessionRequestModel();

  public speakerResponse: SpeakerResponseModel = new SpeakerResponseModel();
  public owner: UserModel = new UserModel();
  public address: AddressResponseModel = new AddressResponseModel();
  public hall: HallResponseModel = new HallResponseModel();

  constructor(
    private speakerService: SpeakerService,
    private addressService: AddressService,
    private userService: UserService,
    private hallService: HallService,
    private activeModal: NgbActiveModal,
    private sessionService: SessionService,
    private router: Router,
    private modal: NgbModal,
    private toastService:ToastsService
  ) { }

  ngOnInit(): void {
    this.sessionRequest.date = this.sessionResponse.date;
    this.sessionRequest.description = this.sessionResponse.description;
    this.sessionRequest.endTime = this.sessionResponse.endTime;
    this.sessionRequest.startTime = this.sessionResponse.startTime;
    this.sessionRequest.sessionName = this.sessionResponse.sessionName;
    this.getOwner();
    this.getAddress();
    this.getHall();
    this.getSpeaker();
    const datepipe: DatePipe = new DatePipe('en-US')
    this.startTime = datepipe.transform(this.sessionResponse.startTime, 'dd-MMM-YYYY HH:mm:ss') || " ";
    this.endTime = datepipe.transform(this.sessionResponse.endTime, 'dd-MMM-YYYY HH:mm:ss') || " ";
  }

  public onClickCloseModal() { 
    this.activeModal.close();
  }

  private getOwner() { 
    this.userService.getOne(this.sessionResponse.owner.id).subscribe(
      (response: UserModel) => { 
        this.owner = response;
        this.sessionRequest.owner = response.id
      },(err: HttpErrorResponse) => {
        const modalRef = this.modal.open(ErrorComponent);
        if (err.status === 0) {
            modalRef.componentInstance.content = "Failed to get your information.";
            modalRef.componentInstance.subContent = "Please, try to sign in again.";
        } else {
          modalRef.componentInstance.content = err.error.errorMessage;
        }
      }
    )
  }

  private getAddress() { 
    this.addressService.getOne(this.sessionResponse.address.id).subscribe(
      (response: AddressResponseModel) => {
        this.sessionRequest.address = response.id;
        this.address = response;
       },(err: HttpErrorResponse) => {
        const modalRef = this.modal.open(ErrorComponent);
        if (err.status === 0) {
            modalRef.componentInstance.content = "Failed to get your addres.";
            modalRef.componentInstance.subContent = "Please, try again.";
        } else {
          modalRef.componentInstance.content = err.error.errorMessage;
        }
      }
    )
  }

  private getHall() {
    this.hallService.getOne(this.sessionResponse.hall.id).subscribe(
      (response: HallResponseModel) => { 
        this.sessionRequest.hall = response.id;
        this.hall = response;
      }, (err: HttpErrorResponse) => {
        const modalRef = this.modal.open(ErrorComponent);
        
        if (err.status === 0) {
          modalRef.componentInstance.content = "Failed to get your hall.";
          modalRef.componentInstance.subContent = "Please, try again.";
        } else {
          modalRef.componentInstance.content = err.error.errorMessage;
        }
      }
    )
  }

  private getSpeaker() { 
      this.speakerService.getOne(this.sessionResponse.speaker.id).subscribe(
        (response: SpeakerResponseModel)=>{ 
          this.speakerResponse = response;
          this.sessionRequest.speaker = response.id;
        }, (err: HttpErrorResponse) => {
          const modalRef = this.modal.open(ErrorComponent);
          
          if (err.status === 0) {
            modalRef.componentInstance.content = "Failed to get your addres.";
            modalRef.componentInstance.subContent = "Please, try again.";
          } else {
            modalRef.componentInstance.content = err.error.errorMessage;
          }
        }    
      )

  }

  public onClickCreateSession() { 
    console.log(this.sessionRequest);
    this.sessionService.post(this.sessionRequest).subscribe(
      (response) => { 

        this.toastService.show('Success! Your session has been created successfully.', { classname: 'fw-bold bg-success text-light', delay: 5000 });
          

      }, (err: HttpErrorResponse) => {
        const modalRef = this.modal.open(ErrorComponent);

        if (err.status === 0) {
          modalRef.componentInstance.content = "Failed to create a session.";
          modalRef.componentInstance.subContent = "Please, try again later.";
        } else {
          modalRef.componentInstance.content = err.error.errorMessage;
        }
      }
    );

    this.router.navigateByUrl('/daySchedule', { state: { date: this.date, signedIn:true } });
    
    this.activeModal.close();
  }

  public onClickEditSession() { 
    
    this.sessionRequest.id = this.sessionResponse.id;
    console.log(this.sessionRequest);
    this.sessionService.patch(this.sessionRequest).subscribe(
      () => { 
        this.toastService.show('Success! Your session has been created seuccessfully.', { classname: 'fw-bold bg-success text-light', delay: 5000 });
      }
    )
    this.router.navigateByUrl('/daySchedule', { state: { date: this.date, signedIn:true } });
    
    this.activeModal.close();
  }
}
