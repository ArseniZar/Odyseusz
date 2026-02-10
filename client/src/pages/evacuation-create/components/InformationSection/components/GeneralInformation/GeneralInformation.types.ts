
import type { EvacuationFormValues } from "@/types/forms/evacuation";
import type { InformationSectionConfig } from "../../../../config/informationSection.config.types";

export interface  GeneralInformationProps {
  name: EvacuationFormValues["generalInfoForm"]["name"];
  description: EvacuationFormValues["generalInfoForm"]["description"];
  reason: EvacuationFormValues["generalInfoForm"]["reason"];
  infoText: InformationSectionConfig;
}