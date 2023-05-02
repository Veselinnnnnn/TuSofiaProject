import { Injectable, NgModule } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
@NgModule()
export class JwtService {
  private helper = new JwtHelperService();

  getDecodedAccessToken(response: any) {    
    return this.helper.decodeToken(response.token)?.id;
  }

  constructor() { }
}
