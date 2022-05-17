import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Summary } from '../models/summary';
import { Detail } from '../models/detail';
import { Login } from '../models/login';
import { Token } from '../models/token';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // private readonly dataEndpoint = 'http://api.harry.techbnology/data'
  // private readonly userEndpoint = 'http://api.harry.techbnology/user'
  private readonly dataEndpoint = 'http://localhost:8080/data'
  private readonly userEndpoint = 'http://localhost:8080/user'

  constructor(private http: HttpClient, private auth: AuthService) { }

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
    const userId = this.auth.stringToToken(this.auth.TokenString).payload.id;
    const body = {
      token: token,
      id: userId
    }
    return this.http.post<Login>(this.userEndpoint + "/refresh", token)
  }
}
