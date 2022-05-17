import { Device } from "./submodels/device";
import { Fingerprint } from "./submodels/fingerprint";
import { Ip } from "./submodels/ip";
import { Language } from "./submodels/language";
import { Page } from "./submodels/page";

export class Detail {
  constructor(public devices: Device[], public fingerprints: Fingerprint[], public ips: Ip[], public languages: Language[], public pages: Page[]) { }
}
