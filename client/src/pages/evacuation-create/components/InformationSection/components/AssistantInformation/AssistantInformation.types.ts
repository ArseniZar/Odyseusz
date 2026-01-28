import type { InformationSectionConfig } from "../../../../config/informationSection.config.types";

export interface AssistantInformationProps {
  assistantNumber: number;
  infoText: InformationSectionConfig["assistant"];
  name: string;
  workingHours: string;
  phone: string;
  email: string;
}