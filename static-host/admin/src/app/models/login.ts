import { Token } from "./token";

export class Login {
  constructor(public token: Token, public refresh: Token) { }
}
