import { Token } from "./token";

export class Login {
  constructor(public token: string, public refresh: string) { }
}
