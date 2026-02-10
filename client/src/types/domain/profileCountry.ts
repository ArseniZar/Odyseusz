export type DangerLevel = "LOW" | "MEDIUM" | "HIGH" | "EXTREME";

export interface Consulate {
  id: number;
  address: string;
  phone: string;
  email: string;
  website: string;
  dataUpdate: Date;
}

export interface ProfileCountry {
  id: number;
  name: string;
  canEdit: boolean;
  dangerLevel: DangerLevel;
  description: string;
  countryCode: string;
  consulates: Consulate[];
  dataUpdate: Date;
}

export type ProfileCountryEdit = Omit<ProfileCountry,  "dataUpdate" | "name" |"countryCode" | "dangerLevel" | "canEdit"> ;