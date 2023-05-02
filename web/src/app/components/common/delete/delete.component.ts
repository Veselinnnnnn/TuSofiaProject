import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestService } from 'src/app/services/request.service';
import { ToastsService } from 'src/app/services/toasts.service';
import { ErrorComponent } from '../error/error.component';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent {
  @Input() public url!: string;
  @Input() public id!: number;

  constructor(
    private activeModal: NgbActiveModal,
    private requestService: RequestService,
    private modal: NgbModal,
    private toastService: ToastsService
  ){}

  public onClickCloseModal(){
    this.activeModal.close();
  }

  public onClickDelete(){
    this.requestService.delete(this.url, this.id).subscribe(
      () => { 
        this.toastService.show('Success! Your element has been deleted successfully.', { classname: 'fw-bold bg-success text-light', delay: 5000 });
      }, (err: HttpErrorResponse) => {
        const modalRef = this.modal.open(ErrorComponent);
        
        if (err.status === 0) {
          modalRef.componentInstance.content = "Failed to delete.";
          modalRef.componentInstance.subContent = "Please, try again later.";
        } else {
          modalRef.componentInstance.content = err.error.errorMessage;
        }
      }
    );
    this.activeModal.close();
  }
}
