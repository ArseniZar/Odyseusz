import type { InformationSectionConfig } from "@/pages/evacuation-create/config/informationSection.config.types";

export interface AssistantsInformationProps {
  assistantsNumber: number;
  infoText: InformationSectionConfig["assistants"];
  name: string;
  workingHours: string;
  phone: string;
  email: string;
}