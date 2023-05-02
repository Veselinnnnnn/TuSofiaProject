import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {
  @Input() public content!: string;
  @Input() public subContent:string ="";
  
  constructor(
    private modal:NgbActiveModal
  ) { }
  
  public CloseDialog() {
    this.modal.close();
  }
}
