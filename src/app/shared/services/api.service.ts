import { environment } from './../../../environments/environment';
import { ApiResponse } from './../../core/models/api-response.interface';
import { Observable, map, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly api = environment.apiURL;
  constructor(
    private http: HttpClient
  ) { }
  get<T>(url: string): Observable<T> {
    return this.http.get<ApiResponse>(url).pipe(
      map(res => res.error ? [] : res.data)
    );
  }
  post<T>(url: string, params: any): Observable<T> {
    return this.http.post<ApiResponse>(url, params).pipe(
      map(res => res.error ? [] : res.data)
    );
  }
  put<T, I>(url: string, params: T | I): Observable<T | I> {
    return this.http.put<ApiResponse>(url, params).pipe(
      map(res => res.error ? [] : res.data)
    );
  }
  delete<T>(url: string, params: any): Observable<T> {
    return this.http.delete<ApiResponse>(url, params).pipe(
      map(() => null)
    );
  }
  buildUrl(params: { route: string }): string {
    return `${this.api}/${params.route}`;
  }
}
