import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { AuthServiceService } from '../auth/auth-service.service';


@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private url = environment.api_url;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthServiceService
  ) { }

  getCharacters( endPoint: string, limit = 10, offset = 0 ){
    let securityHeaders = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    endPoint = `${endPoint}?limit=${limit}&offset=${offset}`
    const url = `${this.url}/${endPoint}`;
    return this.httpClient.get(url, {headers: securityHeaders});
  }

  getCharacter( endPoint: string ){
    let securityHeaders = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    const url = `${this.url}/${endPoint}`;
    return this.httpClient.get(url, {headers: securityHeaders});
  }

  getProfile( endPoint: string ){
    let securityHeaders = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    const url = `${this.url}/${endPoint}`;
    return this.httpClient.get(url, {headers: securityHeaders});
  }

  add_additional_info( endPoint: string ){

  }

}
