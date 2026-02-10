import type { AssistantFormValues } from "@/types/forms/evacuation";
import type { InformationSectionConfig } from "../../../../config/informationSection.config.types";

export interface AssistantInformationProps {
  assistantNumber: number;
  infoText: InformationSectionConfig["assistant"];
  name: AssistantFormValues["name"];
  workingHours: AssistantFormValues["workingHours"];
  phone: AssistantFormValues["phone"];
  email: AssistantFormValues["email"];
}