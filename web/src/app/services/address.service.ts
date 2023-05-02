import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddressRequestModel } from '../models/address-request.model';
import { AddressResponseModel } from '../models/address-response.model';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private apiServerUrl = environment.apiBaseUrl;
  private refreshAfterRequest = new Subject<void>();
 
  get RefreshAfterRequest() {
    return this.refreshAfterRequest;
  }

  constructor(
    private http: HttpClient
  ) { }

  public getAll(params:HttpParams): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/addresses`, { params })
  }

  public post(data: AddressRequestModel): Observable<AddressResponseModel> { 
    return this.http.post<AddressResponseModel>(`${this.apiServerUrl}${AddressRequestModel.url}`, data).pipe(tap(
      () => { 
        this.RefreshAfterRequest.next();
      }
   ))
  }

  public patch(address: AddressRequestModel) {
    return this.http.patch<AddressResponseModel>(`${this.apiServerUrl}${AddressRequestModel.url}`, address).pipe(tap(
      () => { 
        this.RefreshAfterRequest.next();
      }
    ))
  }

  public getOne(id: number) { 
    return this.http.get<AddressResponseModel>(`${this.apiServerUrl}${AddressRequestModel.url}/${id}`);
  }

  public getOneByName(name: number) { 
    return this.http.get<AddressResponseModel>(`${this.apiServerUrl}${AddressRequestModel.url}/searchByName/${name}`)
  }
}
