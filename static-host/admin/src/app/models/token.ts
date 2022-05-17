import { TokenHeader } from "./submodels/token-header";
import { TokenPayload } from "./submodels/token-payload";
import { TokenSignature } from "./submodels/token-signature";

export class Token {
  constructor(public header: TokenHeader, public payload: TokenPayload, public signature: TokenSignature) { }
}
