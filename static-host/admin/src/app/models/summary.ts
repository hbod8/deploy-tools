import { Hostname } from "./submodels/hostname";

export class Summary {
  constructor(public hostnames: Hostname[]) { }
}
