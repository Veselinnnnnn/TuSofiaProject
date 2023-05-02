import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastsService } from 'src/app/services/toasts.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorComponent } from '../../common/error/error.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  public form!: FormGroup;
  private model: UserModel = new UserModel();

  constructor(
    private userService: UserService,
    private router: Router,
    private toastsService: ToastsService,
    private modal: NgbModal
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  public signUp() {
    if (this.form.valid) {
      this.model = this.fillModel();
      this.userService.signUp(this.model).subscribe(
        (response: any) => {
          this.router.navigateByUrl('');
          this.toastsService.show("Welcome, " + response.firstName + "! You have successfully signed up.",{ classname: 'fw-bold bg-success text-light', delay: 5000 });
        }, (err: HttpErrorResponse) => {
          const modalRef = this.modal.open(ErrorComponent);
          
          if (err.status === 0) {
            modalRef.componentInstance.content = "Failed to sign up.";
            modalRef.componentInstance.subContent = "Please, try again later.";
          } else {
            modalRef.componentInstance.content = err.error.errorMessage;
          }
        }
      )
    }
  } 
  
  private fillModel(): UserModel {
    this.model!.firstName = this.form.get('firstName')!.value;
    this.model!.lastName = this.form.get('lastName')!.value;
    this.model!.username = this.form.get('username')!.value;
    this.model!.email = this.form.get('email')!.value;
    this.model!.password = this.form.get('password')!.value;
    return this.model;
  }

  private buildForm(): void {
    this.form = new FormGroup({
      'firstName': new FormControl("", Validators.required),
      'lastName': new FormControl("", Validators.required),
      'username': new FormControl("", Validators.required),
      'email': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required)
    })
  }
}
