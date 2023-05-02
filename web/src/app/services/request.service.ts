import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private apiServerUrl = environment.apiBaseUrl;
  private refreshAfterRequest = new Subject<void>();

  get RefreshAfterRequest() {
    return this.refreshAfterRequest;
  }

  constructor(
    private http: HttpClient
  ) { }

  public post(url: string, data: any): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}${url}`, data).pipe(tap(
      () => {
        this.RefreshAfterRequest.next();
      }
    ));
  }

  public getAll(url: string, data: any): Observable<any> {
    const params = new HttpParams().set('data', data);
    return this.http.get<any>(`${this.apiServerUrl}${url}`, { params })
  }

  public getAllWithOutConditions(url: string): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}${url}`)
  }

  public getOne(url: string, data: any): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}${url}/${data}`);
  }

  public delete(url: string, id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiServerUrl}${url}/${id}`).pipe(tap(
      () => {
        this.RefreshAfterRequest.next();
      }
    ));
  }

  public patch(url: string, data: any) {
    return this.http.patch<any>(`${this.apiServerUrl}${url}`, data).pipe(
      tap(() => {
        this.refreshAfterRequest.next();
      }));
  }

  public getALLFreeStartingHours(url:string, hallId:number,date:any,timestamp:any):Observable<any>{
    return this.http.get<any>(`${this.apiServerUrl}${url}/${hallId}/${date}/${timestamp}`);
  }
}
