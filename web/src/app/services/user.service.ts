import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiServerUrl = environment.apiBaseUrl;
  private refreshAfterRequest = new Subject<void>();
  
  get RefreshAfterRequest() { 
    return this.refreshAfterRequest;
  }
  constructor(
    private http: HttpClient
  ) { }

  public signUp(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.apiServerUrl}${UserModel.url}${UserModel.signUpUrl}`, user, { headers: {skip:"true"} });
  }
  
  public signIn(user: UserModel): Observable<any>{
    return this.http.post<any>(`${this.apiServerUrl}${UserModel.url}${UserModel.signInUrl}`, user, { headers: {skip:"true"} });
  }

  public getOne(userId: number) { 
    return this.http.get<UserModel>(`${this.apiServerUrl}${UserModel.url}/${userId}`);
  }

  public patch(data: UserModel):Observable<UserModel> {
    return this.http.patch<UserModel>(`${this.apiServerUrl}${UserModel.url}`, data).pipe(tap(
      () => { 
        this.RefreshAfterRequest.next();
      }
    ))
   }
}
