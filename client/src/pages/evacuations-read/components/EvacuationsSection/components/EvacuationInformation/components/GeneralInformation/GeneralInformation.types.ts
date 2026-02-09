import type { Evacuation } from "@/types/domain/evacuation";
import type { EvacuationsSectionConfig } from "../../../../../../config/evacuationsSection.config.types";

type EvacuationInfo = Pick<Evacuation,   'reason' | 'description' | "dataLastActivated">;

export interface GeneralInformationProps extends EvacuationInfo {
    infoText: EvacuationsSectionConfig;
    
}      