export class TokenPayload {
  constructor(public type: string, public id: string, public iat: number, public exp: number) { }
}
