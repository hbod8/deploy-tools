import { Injectable } from '@angular/core';
import { TokenSignature } from '../models/submodels/token-signature';
import { Token } from '../models/token';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private api: ApiService) { }

  public stringToToken(input: string): Token {
    return new Token(JSON.parse(atob(input.split('.')[0])), JSON.parse(atob(input.split('.')[1])), new TokenSignature(input.split('.')[2]))
  }

  private getTokenFromStorage(): Token {
    const data = localStorage.getItem('jwt')
    return this.stringToToken(data!)
  }

  private getRefreshTokenFromStorage(): Token {
    const data = localStorage.getItem('jwt-refresh')
    return this.stringToToken(data!)
  }

  private checkExp(token: Token): boolean {
    return token.payload.exp < (Date.now() / 1000)
  }

  public getToken(): Token {
    if (this.checkExp(this.getTokenFromStorage())) {

    } else {
      return this.getTokenFromStorage()
    }
  }

  public authenticate(email: string, password: string) {
    //@TODO: call login api, write token to storage, blah blah, refresh sum stuff, make sure you cannot access data without being logged in (duh)
    // you were tired and were getting nowhere, big issues everywhere, probably write down a sequence diagram
    // this is really messy:
    // calls made by components: API calls, isAuthenticated() -> when to check refresh token, only on API calls? yes
    // calls made by APIService: get token strings
  }

  public authenticated(): boolean {
    return this.getToken() != null
  }

  public async refreshAuthentication() {

  }
}
