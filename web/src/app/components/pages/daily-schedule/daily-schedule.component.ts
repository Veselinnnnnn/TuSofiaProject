import { DatePipe } from '@angular/common';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Member } from 'src/app/models/Member';
import { SessionRequestModel } from 'src/app/models/session-request.model';
import { SessionResponseModel } from 'src/app/models/session-response.model';
import { UserModel } from 'src/app/models/user.model';
import { RequestService } from 'src/app/services/request.service';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/user.service';
import { DeleteComponent } from '../../common/delete/delete.component';
import { ErrorComponent } from '../../common/error/error.component';
import { ModeEnum } from '../../enums/ModeEnum';
import { ViewSessionComponent } from '../../forms/create-edit-view-session/view-session/view-session.component';



@Component({
  selector: 'app-daily-scheduled',
  templateUrl: './daily-schedule.component.html',
  styleUrls: ['./daily-schedule.component.scss']
})
export class DailyScheduleComponent implements OnInit {
  public date: Date = window.history.state.date;
  public signedIn: number = parseInt(localStorage.getItem('id')!) || 0;
  public sessionsResponse!: SessionResponseModel[];
  public session: SessionRequestModel = new SessionRequestModel();
  public member: Member = new Member();
  public dateFormat!: string;
  public monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  public page: number = 1;
  public size: number = 10;
  public totalElements: number = 0;

  constructor(
    private router: Router,
    private requestService: RequestService,
    private sessionService: SessionService,
    private userService: UserService,
    private datepipe: DatePipe,
    private modal: NgbModal
  ) { }

  public ngOnInit(): void {
    this.dateFormat = this.datepipe.transform(this.date, 'yyyy-MM-dd') || ' ';

    this.getAllSession();
    this.requestService.RefreshAfterRequest.subscribe(response => {
      this.getAllSession();
    })
  }

  public getAllSession(): void {
    const params = new HttpParams().set("data", this.dateFormat).set("size", this.size).set("page", this.page);

    this.sessionService.getAll(params).subscribe(
      (response: any) => {
        this.sessionsResponse = response.content;
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

  public onClickMarksAsActive(session: SessionResponseModel, index: number) {
      if (session.hall.seatCapacity > session.members.length) {
        this.userService.getOne(parseInt(localStorage.getItem('id')!)).subscribe(
          (response: UserModel) => {
            session.members.push(response);

            this.member.sessionId = session.id;
            this.member.members.push(response);

            this.sessionService.addMember(this.member).subscribe()
          }
        )
    } else {
      this.userService.getOne(parseInt(localStorage.getItem('id')!)).subscribe(
        (response: UserModel) => {
          session.members.slice(index, session.members.indexOf(response));
          this.member.sessionId = session.id;
          this.member.members.push(response);
          var date = { owner: parseInt(localStorage.getItem('id')!), session: session.id }
          this.sessionService.removeMember(date).subscribe(
            (response) => {
            }
          )
        }
      )
    }
  }


  public createSession() {
    if (this.signedIn) {
      this.router.navigateByUrl('/createSession', { state: { date: this.date, mode: ModeEnum.NEW, signedIn: true } });
    } else {
      this.router.navigateByUrl('/signIn', { state: { signedIn: true } });
    }
  }

  public onClickUpdateSession(session: SessionResponseModel) {
    if (this.checkOwner(session)) {
      this.router.navigateByUrl('/createSession', { state: {session:session,date : this.date, mode: ModeEnum.EDIT} })
    } else {
      const modalRef = this.modal.open(ErrorComponent);
      modalRef.componentInstance.content = "You dont have permission to update this session!";
      modalRef.componentInstance.subContent = "Only the creator can update it.";
    }
  }

  private checkOwner(session: SessionResponseModel) {
    if (session.owner.id === parseInt(localStorage.getItem('id')!)) {
      return true;
    }
    return false;
  }

  public onClickViewSession(session: SessionResponseModel) {
    const modalRef = this.modal.open(ViewSessionComponent, { size: 'lg', centered: true });
    modalRef.componentInstance.sessionResponse = session;
    modalRef.componentInstance.date = this.date;
    modalRef.componentInstance.mode = ModeEnum.READ;
  }

  public onClickDelete(session: SessionResponseModel) {
    if (this.checkOwner(session)) {
      const modalRef = this.modal.open(DeleteComponent);
      modalRef.componentInstance.url = SessionResponseModel.url;
      modalRef.componentInstance.id = session.id;
    } else {
      const modalRef = this.modal.open(ErrorComponent);
      modalRef.componentInstance.content = "You dont have permission to delete this session!";
      modalRef.componentInstance.subContent = "Only the creator can delete it.";
    }
  }
}
