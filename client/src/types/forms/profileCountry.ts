import type { Consulate, ProfileCountry } from "@/types/domain/profileCountry";

export interface ConsulateFormValues {
  id: Consulate["id"];
  address: Consulate["address"];
  phone: Consulate["phone"];
  email: Consulate["email"];
  website: Consulate["website"];
  dataUpdate: Consulate["dataUpdate"];
  isActive: boolean;
}

export interface ProfileCountryFormValues {
  id: ProfileCountry["id"];
  generalInfoForm: {
    name: ProfileCountry["name"];
    description: ProfileCountry["description"] | null;
    countryCode: ProfileCountry["countryCode"];
    dateUpdate: ProfileCountry["dataUpdate"];
    dangerLevel: ProfileCountry["dangerLevel"];
  };
  consulatesForm: {
    consulates: ConsulateFormValues[];
  };
}