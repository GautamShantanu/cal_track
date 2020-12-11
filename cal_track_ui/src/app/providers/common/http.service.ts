import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  get(url: string, options?: any): Observable<any> {
    return this.http.get(url, options);
  }

  post(url: string, data: any, options?: any): Observable<any> {
    return this.http.post(url, data, options);
  }
}
