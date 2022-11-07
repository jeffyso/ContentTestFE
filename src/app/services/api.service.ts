import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  _apiUrl: string = environment.apiUrl
  

  headers(): any {
    console.log(localStorage.getItem("token"))
    return {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
  }

  public authGet(url: string) {
    return this.http.get<any>(`${this._apiUrl}${url}`,)
  }

  public authPost(url: string, data: any) {
    return this.http.post<any>(`${this._apiUrl}${url}`, data)
  }

  public authPut(url: string, data: any) {
    return this.http.put<any>(`${this._apiUrl}${url}`, data )
  }

  public authDelete(url: string) {
    return this.http.delete<any>(`${this._apiUrl}${url}` ,this.headers())
  }

  public get(url: string) {
    return this.http.get<any>(`${this._apiUrl}${url}`, this.headers())
  }

  public post(url: string, data: any) {
    return this.http.post<any>(`${this._apiUrl}${url}`, data, this.headers())
  }

  public put(url: string, data: any) {

    return this.http.put<any>(`${this._apiUrl}${url}`, data, this.headers())
  }

  public delete(url: string) {
    return this.http.delete<any>(`${this._apiUrl}${url}`, this.headers())
  }

  // public checkError(err: errorResponse) {
  //   switch (err.status) {
  //     case 400:
  //       err.error.message ? this.alert.alert_error(err.error.message) : this.alert.alert_error('ไม่พบข้อมูล');
  //       break;

  //     case 404:
  //       err.error.message ? this.alert.alert_error(err.error.message) : this.alert.alert_error('ข้อมูลไม่ถูกต้อง');
  //       break;

  //     case 403:
  //       err.error.message ? this.alert.alert_error(err.error.message) : this.alert.alert_error('ไม่มีสิทธิ์เข้าถึงข้อมูล');
  //       setTimeout(() => {
  //         this.router.navigate(['/login']);

  //       }, 2000);
  //       break;

  //     case 500:
  //       err.error.message ? this.alert.alert_error(err.error.message) : this.alert.alert_error('เกิดข้อผิดพลาดในระบบ');
  //       break;

  //     default: this.alert.alert_error('เกิดข้อผิดพลาดในระบบ');
  //       break;
  //   }
  // }
}

