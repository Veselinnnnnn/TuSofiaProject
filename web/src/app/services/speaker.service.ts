import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { isThursday } from 'date-fns';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SpeakerRequestModel } from '../models/speaker-request.model';
import { SpeakerResponseModel } from '../models/speaker-response.model';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SpeakerService {
  private apiServiceUrl = environment.apiBaseUrl;
  private refreshAfterRequest = new Subject<void>();

  get RefreshAfterRequest() {
    return this.refreshAfterRequest
  }

  constructor(
    private http:HttpClient
  ) { }

  public post(data: SpeakerRequestModel): Observable<SpeakerResponseModel> { 
    return this.http.post<SpeakerResponseModel>(`${this.apiServiceUrl}${SpeakerRequestModel.url}`, data).pipe(tap(
      () => { 
        this.RefreshAfterRequest.next();
      }
    ))
  }

  public getAll(params: HttpParams):Observable<any>{
    return this.http.get<any>(`${this.apiServiceUrl}${SpeakerRequestModel.url}`, { params });
  }

  public patch(speaker: SpeakerRequestModel) { 
    return this.http.patch<SpeakerResponseModel>(`${this.apiServiceUrl}${SpeakerRequestModel.url}`, speaker).pipe(tap(
      () => { 
        this.RefreshAfterRequest.next();
      }
    ))
  }

  public addImage(speakerImage: FormData, speakerId: number) { 
    return this.http.patch<SpeakerResponseModel>(`${this.apiServiceUrl}${SpeakerRequestModel.url}/${speakerId}/upload`, speakerImage).pipe(tap(
      () => { 
        this.RefreshAfterRequest.next();
      }
    ))
  }

  public getImage(speaker: number) { 
    return this.http.get<any>(`${this.apiServiceUrl}${SpeakerRequestModel.url}/${speaker}/image`);
  }

  public getOne(id: number) { 
    return this.http.get<SpeakerResponseModel>(`${this.apiServiceUrl}${SpeakerRequestModel.url}/${id}`);
  }
}
