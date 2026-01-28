import type { DangerLevel } from "@/types/all_types";

export interface ConsulateFomValues {
  id: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  dataUpdate: Date;
  isActive: boolean | null;
}

export interface ProfileCountryValues {
  generalInfoForm: {
    name: string;
    description: string | null;
    countryCode: string;
    dateUpdate: Date;
    dangerLevel: DangerLevel;
  };
  consulatesForm: {
    consulates: ConsulateFomValues[];
  };
}