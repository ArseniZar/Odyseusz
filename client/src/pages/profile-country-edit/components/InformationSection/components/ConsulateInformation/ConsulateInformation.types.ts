import type { ConsulateFomValues } from "../../../../ProfileCountryEditPage.types";
import type { InformationSectionConfig } from "../../../../config/informationSection.config.types";

export interface ConsulateInformationProps {
  consulateNumber: number;
  infoText: InformationSectionConfig["consulate"];
  address: ConsulateFomValues["address"];
  phone: ConsulateFomValues["phone"];
  email: ConsulateFomValues["email"];
  website: ConsulateFomValues["website"];
  dataUpdate: ConsulateFomValues["dataUpdate"];
}