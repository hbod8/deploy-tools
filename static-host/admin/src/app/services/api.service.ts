import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Summary } from '../models/summary';
import { Detail } from '../models/detail';
import { Login } from '../models/login';
import { Token } from '../models/token';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly dataEndpoint = 'http://api.harry.techbnology/data'
  private readonly userEndpoint = 'http://api.harry.techbnology/user'

  constructor(private http: HttpClient) { }

  getSummary(): Observable<Summary> {
    return this.http.get<Summary>(this.dataEndpoint + "/summary")
  }

  getDetail(hostname: string): Observable<Detail> {
    return this.http.get<Detail>(this.dataEndpoint + "/summary?hostname=" + hostname)
  }

  postLogin(email: string, password: string): Observable<Login> {
    const body = {
      email: email,
      password: password
    }
    return this.http.post<Login>(this.userEndpoint + "/login", body)
  }

  postRefresh(token: string): Observable<Login> {
    const body = {
      token: token,
      id: 
    }
    return this.http.post<Login>(this.userEndpoint + "/refresh", token)
  }
}
