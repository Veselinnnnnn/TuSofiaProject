import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HallRequestModel } from '../models/hall-request.model';
import { HallResponseModel } from '../models/hall-response.model';

@Injectable({
  providedIn: 'root'
})
export class HallService {
  private apiServerUrl = environment.apiBaseUrl;
  private refreshAfterRequest = new Subject<void>();
 
  get RefreshAfterRequest() {
    return this.refreshAfterRequest;
  }

  constructor(
    private http: HttpClient
  ) { }

  public post(data:HallRequestModel):Observable<HallResponseModel>{
    return this.http.post<HallResponseModel>(`${this.apiServerUrl}${HallRequestModel.url}`,data).pipe(tap(
      ()=>{
        this.RefreshAfterRequest.next();
      }
    ))
  }

  public getAllById(params:HttpParams): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}${HallRequestModel.url}`, { params });
  }

  public patch(hall: HallRequestModel) {
    return this.http.patch<HallResponseModel>(`${this.apiServerUrl}${HallRequestModel.url}`,hall).pipe(
      tap(()=>{
        this.RefreshAfterRequest.next();
      })
    );
  }

  public getOne(id:number){
    return this.http.get<HallResponseModel>(`${this.apiServerUrl}${HallRequestModel.url}/${id}`);
  }
}
