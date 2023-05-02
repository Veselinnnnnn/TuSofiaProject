import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserModel } from 'src/app/models/user.model';
import { JwtService } from 'src/app/services/jwt.service';
import { ToastsService } from 'src/app/services/toasts.service';
import { UserService } from 'src/app/services/user.service';
import { ErrorComponent } from '../../common/error/error.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  public form!: FormGroup;
  private model: UserModel = new UserModel();
  
  constructor(
    private userService: UserService,
    private router: Router,
    private toastsService: ToastsService,
    private modal: NgbModal,
    private jwtService: JwtService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  public signIn(){
    this.form.markAllAsTouched();

    if(this.form.valid){
      this.model = this.fillModel();
      this.userService.signIn(this.model).subscribe(
        (response: any) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('id', this.jwtService.getDecodedAccessToken(response));
          console.log("asdasdasdasdasdasdasd");
          
          this.userService.getOne(parseInt(localStorage.getItem('id')!)).subscribe(
            (response: UserModel) => { 
              localStorage.setItem('username', response.username);
            }
          )

          this.router.navigateByUrl('',{state:{signedIn:true}});
          
          this.toastsService.show("Welcome, " + localStorage.getItem('username') + "! You have successfully signed in.", { classname: 'fw-bold bg-success text-light', delay: 5000 });
        
        }, (err: HttpErrorResponse) => {
          const modalRef = this.modal.open(ErrorComponent);
          
          if (err.status === 0) {
            modalRef.componentInstance.content = "Failed to sign in.";
            modalRef.componentInstance.subContent = "Please, try again later.";
          } else {
            modalRef.componentInstance.content = err.error.errorMessage;
          }
        }
      )
    }
  }

  private fillModel():UserModel{
    this.model!.email = this.form.get('email')!.value;
    this.model!.password = this.form.get('password')!.value;
    return this.model;
  }

  private buildForm():void{
    this.form = new FormGroup({
      'email': new FormControl("",Validators.required),
      'password':  new FormControl("", Validators.required)
    })
  }
}

