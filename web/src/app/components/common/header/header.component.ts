import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public signIn: boolean = window.history.state.signedIn

  public username: string = localStorage.getItem('username') || '';
  public userId: string = localStorage.getItem('id') || "0";

  public user: UserModel = new UserModel();

  constructor(
    private router: Router,
    private userService: UserService
  ) {
    if (this.signIn === true) {
      this.userService.getOne(parseInt(localStorage.getItem('id')!)).subscribe(
        (response: UserModel) => {
          this.user = response;
        }
      )
    }
  }

  ngOnInit(): void {

  }

  public navigateToAccountSettings() {
    this.router.navigateByUrl('/account-settings', { state: { signedIn: true } })
  }

  public onSignOut() {
    this.signIn = false;
    this.router.navigateByUrl('', { state: { signedIn: false } });
  }

  public onClickNavigateToHome() {
    this.router.navigateByUrl('', { state: {signedIn: this.signIn} })
  }
  
  public onClickNavigateToSpeakers() {
    this.router.navigateByUrl('/speakers', { state: { signedIn: this.signIn } });
  }

  public onClickNavigateToAddresses() { 
    this.router.navigateByUrl('/addresses', { state: {signedIn:this.signIn} })
  }
}
