import type { EvacuationsSectionConfig } from "../../../../../../config/evacuationsSection.config.types";

export interface AssistantInformationProps {
  assistantNumber: number;
  infoText: EvacuationsSectionConfig["assistant"];
  name: string;
  workingHours: string;
  phone: string;
  email: string;
}