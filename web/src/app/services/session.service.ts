import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Member } from '../models/Member';
import { SessionRequestModel } from '../models/session-request.model';
import { SessionResponseModel } from '../models/session-response.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private apiServerUrl = environment.apiBaseUrl;
  private refreshAfterRequest = new Subject<void>();
  
  get RefreshAfterRequest() {
    return this.refreshAfterRequest;
  }

  constructor(private http: HttpClient) { }

  public post(data: SessionRequestModel): Observable<SessionResponseModel> {
    return this.http.post<any>(`${this.apiServerUrl}${SessionResponseModel.url}`, data).pipe(tap(
      () => {
        this.RefreshAfterRequest.next();
      }
    ));
  }

  public getAll(params: HttpParams): Observable<any> { 
    return this.http.get<any>(`${this.apiServerUrl}${SessionResponseModel.url}`, { params });
  }
  
  public patch(session: SessionRequestModel) { 
    return this.http.patch<SessionResponseModel>(`${this.apiServerUrl}${SessionResponseModel.url}`, session).pipe(tap(
      () => {
        this.RefreshAfterRequest.next();
       }
    ))
  }

  public addMember(session: Member) { 
    return this.http.patch<any>(`${this.apiServerUrl}${SessionResponseModel.url}/addMember`, session).pipe(tap(
      () => { 
        this.RefreshAfterRequest.next();
      }
    ))
  }

  public removeMember(data: { owner: number, session: number }) { 
    return this.http.patch<any>(`${this.apiServerUrl}${SessionRequestModel.url}/removeMember`, data).pipe(tap(
      () => { 
        this.RefreshAfterRequest.next();
      }
    ))
  }

  public getOne(id: number) { 
    return this.http.get<SessionResponseModel>(`${this.apiServerUrl}${SessionResponseModel.url}/${id}`);
  }

  public maxProgram(params: HttpParams): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}${SessionResponseModel.url}/maxProgram`, { params });
  }

  public getAllFutureSession(params: HttpParams): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}${SessionResponseModel.url}/getFutureSessions`, { params });
  }

  public getAllExpiredSession(params: HttpParams): Observable<any> { 
    return this.http.get<any>(`${this.apiServerUrl}${SessionResponseModel.url}/getExpiredSessions`, { params });
  }
}
