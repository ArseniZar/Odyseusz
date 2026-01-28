import type { EvacuationFormValues } from "@/pages/evacuation-create/EvacuationCreatePage.types";
import type { InformationSectionConfig } from "../../../../config/informationSection.config.types";

export interface  GeneralInformationProps {
  name: EvacuationFormValues["generalInfoForm"]["name"];
  description: EvacuationFormValues["generalInfoForm"]["description"];
  reason: EvacuationFormValues["generalInfoForm"]["reason"];
  radius: EvacuationFormValues["areaForm"]["radius"];
  infoText: InformationSectionConfig;
}