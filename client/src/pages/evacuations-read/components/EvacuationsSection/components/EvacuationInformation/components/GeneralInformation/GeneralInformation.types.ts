import type { Evacuation } from "@/types/all_types";
import type { EvacuationsSectionConfig } from "../../../../../../config/evacuationsSection.config.types";

type EvacuationInfo = Pick<Evacuation,   'reason' | 'description' | 'area' | "dataLastActivated">;

export interface GeneralInformationProps extends EvacuationInfo {
    description: string;
    infoText: EvacuationsSectionConfig;
    
}      