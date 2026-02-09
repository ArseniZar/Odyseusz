import type { Evacuation } from "@/types/domain/evacuation";
import type { EvacuationsSectionConfig } from "../../../../../../config/evacuationsSection.config.types";

type EvacuationInfo = Pick<Evacuation["assistants"][number], 'name' | 'workingHours' | 'phone' | 'email'>;

export interface AssistantInformationProps extends EvacuationInfo {
  assistantNumber: number;
  infoText: EvacuationsSectionConfig["assistant"];
}