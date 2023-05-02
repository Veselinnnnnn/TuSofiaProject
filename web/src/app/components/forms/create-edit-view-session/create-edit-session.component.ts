import { DatePipe } from '@angular/common';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddressResponseModel } from 'src/app/models/address-response.model';
import { HallResponseModel } from 'src/app/models/hall-response.model';
import { SessionRequestModel } from 'src/app/models/session-request.model';
import { SessionResponseModel } from 'src/app/models/session-response.model';
import { SpeakerResponseModel } from 'src/app/models/speaker-response.model';
import { AddressService } from 'src/app/services/address.service';
import { HallService } from 'src/app/services/hall.service';
import { RequestService } from 'src/app/services/request.service';
import { SpeakerService } from 'src/app/services/speaker.service';
import { ErrorComponent } from '../../common/error/error.component';
import { ModeEnum } from '../../enums/ModeEnum';
import { CreateAddressComponent } from '../create-edit-view-address/create-edit-view-address.component';
import { CreateHallComponent } from '../create-edit-view-hall/create-edit-view-hall.component';
import { ViewSessionComponent } from './view-session/view-session.component';

@Component({
  selector: 'app-create-edit-session',
  templateUrl: './create-edit-session.component.html',
  styleUrls: ['./create-edit-session.component.scss']
})
export class CreateEditViewSessionComponent implements OnInit {
  public date: Date = window.history.state.date;
  public mode: ModeEnum = window.history.state.mode || ModeEnum.EDIT;
  public session: SessionResponseModel = window.history.state.session;

  readonly MODES = ModeEnum;

  public form!: FormGroup;
  public address!: AddressResponseModel;
  public halls!: HallResponseModel[];
  public sessionRequest: SessionRequestModel = new SessionRequestModel();
  public sessionResponse: SessionResponseModel = new SessionResponseModel();
  public speakers!: SpeakerResponseModel[];

  public buttonDisabled: boolean = true;
  public addressId: number = 0;
  public addressExists: number = 0;
  public addressName: string = '';
  public hours!: any;
  public availableHours: boolean = false;
  public showSpeaker: boolean = false;

  public asd!: string;
  constructor(
    private requestService: RequestService,
    private addressService: AddressService,
    private hallService: HallService,
    private speakerService: SpeakerService,
    private datePipe: DatePipe,
    private modal: NgbModal,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.buildForm();

    switch (this.mode) {
      case ModeEnum.NEW: {
        this.sessionRequest = new SessionRequestModel();
        break;
      }
      case ModeEnum.EDIT: {
        console.log(this.session);
        this.fillForm();
        break;
      }
    }
  }

  public showAllSpeakers() {
    const params = new HttpParams();

    this.speakerService.getAll(params).subscribe(
      response => {
        this.speakers = response.content;
        this.showSpeaker = true;
        this.availableHours = false;

      }, (err: HttpErrorResponse) => {
        const modalRef = this.modal.open(ErrorComponent);

        if (err.status === 0) {
          modalRef.componentInstance.content = "Failed to load list.";
          modalRef.componentInstance.subContent = "Please, try again later.";
        } else {
          modalRef.componentInstance.content = err.error.errorMessage;
        }
      }
    )
  }

  public onClickPickSpeaker(speaker: SpeakerResponseModel) {
    this.sessionResponse.speaker.id = speaker.id;
    this.buttonDisabled = false;
    this.sessionResponse.owner.id = parseInt(localStorage.getItem('id')!);
  }


  public showAllFreeHours(hallId: number) {
    this.requestService.getALLFreeStartingHours(
      SessionResponseModel.url,
      hallId,
      this.datePipe.transform(this.date, 'yyyy-MM-dd'),
      this.form.get('sessionDuration')?.value).subscribe(
        (response: Date[]) => {
          this.hours = response;
          this.addressExists = 0;
          this.availableHours = true;
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

  public padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }

  public onClickPickHour(hour: string) {
    var index = hour.indexOf(":");
    var hours = hour.substring(0, index);
    var minutes = hour.substring(index + 1);

    this.sessionResponse.date = ([this.date.getFullYear(),
    this.padTo2Digits(this.date.getMonth() + 1),
    this.padTo2Digits(this.date.getDate())].join('-')).toString();


    this.sessionResponse.startTime = new Date(this.date);
    this.sessionResponse.startTime.setHours(parseInt(hours));
    this.sessionResponse.startTime.setMinutes(parseInt(minutes));

    this.sessionResponse.endTime = new Date(this.date);
    this.sessionResponse.endTime.setHours(parseInt(hours));
    this.sessionResponse.endTime.setMinutes(parseInt(minutes));

    this.sessionResponse.endTime.setMinutes(this.sessionResponse.startTime.getMinutes() + parseInt(this.form.get('sessionDuration')?.value));

    this.showAllSpeakers();
  }

  public onClickGoBack() {
    this.router.navigateByUrl('/daySchedule', { state: { date: this.date, signedId: true } });
  }

  public onClickEditSession() {
    const modalRef = this.modal.open(ViewSessionComponent, { size: 'lg', centered: true });
    modalRef.componentInstance.sessionResponse = this.sessionResponse;
    modalRef.componentInstance.date = this.date;
    modalRef.componentInstance.mode = ModeEnum.EDIT;
  }

  public onClickCreateSession() {

    const modalRef = this.modal.open(ViewSessionComponent, { size: 'lg', centered: true });
    modalRef.componentInstance.sessionResponse = this.sessionResponse;
    modalRef.componentInstance.date = this.date;
    modalRef.componentInstance.mode = ModeEnum.NEW;
  }

  public getAllHalls() {
    var params = new HttpParams().set('data', this.address.id);

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
    )
  }

  public onClickPickHall(hallId: number) {
    this.sessionResponse.hall.id = hallId;
    this.showAllFreeHours(hallId);
  }

  public addHallToAddress() {
    const modalRef = this.modal.open(CreateHallComponent, { centered: true });
    modalRef.componentInstance.addressId = this.address.id;
    modalRef.componentInstance.mode = ModeEnum.NEW;
  }

  public openCreateAddressModal() {
    this.addressName = '';
    this.addressExists = 0;

    const modalRef = this.modal.open(CreateAddressComponent, { centered: true });
    modalRef.componentInstance.mode = ModeEnum.NEW
    modalRef.componentInstance.addressId.subscribe((addressId: number) => {
      this.addressId = addressId;
    })
  }

  public clearAddressInput() {
    this.addressName = '';
    this.addressExists = 0;
  }

  public checkAddressAndGetAllHallsIfExists() {
    this.availableHours = false;
    this.addressExists = 0;
    this.addressService.getOneByName(this.form.get('address')?.value).subscribe(
      (response: AddressResponseModel) => {
        this.address = response;
        this.sessionResponse.address.id = response.id;
        this.sessionResponse = this.fillModel();
        this.addressExists = 1;
        this.getAllHalls();
        this.requestService.RefreshAfterRequest.subscribe(response => {
          this.getAllHalls();
        })
      }, () => {
        this.addressExists = -1;
      }
    )
  }

  private buildForm() {
    this.form = new FormGroup({
      'sessionName': new FormControl(null, [Validators.required]),
      'description': new FormControl(null),
      'sessionDuration': new FormControl(null, [Validators.required]),
      'address': new FormControl(null, [Validators.required]),
    })
  }

  private fillModel() {
    this.sessionResponse!.sessionName = this.form.get('sessionName')!.value;
    this.sessionResponse!.description = this.form.get('description')!.value;
    return this.sessionResponse;
  }

  private fillForm() {
    this.form.get('sessionName')!.setValue(this.session?.sessionName);
    this.form.get('description')!.setValue(this.session?.description);
  }
}

