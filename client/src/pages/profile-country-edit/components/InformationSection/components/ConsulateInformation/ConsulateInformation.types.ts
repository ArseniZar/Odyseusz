import type { ConsulateFormValues } from "@/types/forms/profileCountry";
import type { InformationSectionConfig } from "../../../../config/informationSection.config.types";

export interface ConsulateInformationProps {
  consulateNumber: number;
  infoText: InformationSectionConfig["consulate"];
  address: ConsulateFormValues["address"];
  phone: ConsulateFormValues["phone"];
  email: ConsulateFormValues["email"];
  website: ConsulateFormValues["website"];
  dataUpdate: ConsulateFormValues["dataUpdate"];
}