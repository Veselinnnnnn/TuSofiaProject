import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserModel } from 'src/app/models/user.model';
import { ToastsService } from 'src/app/services/toasts.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit{
  public form!: FormGroup;
  public userModel!: UserModel;

  constructor(
    private userService: UserService,
    private toastService:ToastsService
  ) {
    this.buildForm();
   }
  
  ngOnInit(): void {
    this.userService.getOne(parseInt(localStorage.getItem('id')!)).subscribe(
      (response: UserModel) => { 
        this.userModel = response;
        this.fillForm();
      }
    );
  }

  public onClickSaveData() { 
    if (this.form.valid) { 
      this.userModel = this.fillModel();
      this.userService.patch(this.userModel).subscribe(
        () => { 
          this.toastService.show('Success! Your personal information has been updated successfully.', { classname: 'bg-success text-light', delay: 5000 });
        }
      )

    }
  }

  private buildForm() { 
    this.form = new FormGroup({
      'firstName': new FormControl(null),
      'lastName': new FormControl(null),
      'username': new FormControl(null),
      'email': new FormControl(null)
    });
  }
  
  private fillForm() {
    this.form.get('firstName')!.setValue(this.userModel?.firstName);
    this.form.get('lastName')!.setValue(this.userModel?.lastName);
    this.form.get('username')!.setValue(this.userModel?.username);
  }
  
  private fillModel() { 
    this.userModel!.firstName = this.form.get('firstName')!.value;
    this.userModel!.lastName = this.form.get('lastName')!.value;
    return this.userModel;
  }
}
