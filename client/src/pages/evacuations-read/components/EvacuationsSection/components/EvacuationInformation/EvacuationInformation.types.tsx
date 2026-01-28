import type { Evacuation } from "@/types/all_types";
import type { EvacuationsSectionConfig } from "../../../../config/evacuationsSection.config.types";

type EvacuationInfo = Pick<Evacuation, 'status' | 'name' | 'reason' | 'description' | 'area' | 'collectionPoints' | 'assistants' | "dataLastActivated">;

export interface EvacuationInformationProps extends EvacuationInfo {
    infoText: EvacuationsSectionConfig;
    onActive: () => void;
    onCancel: () => void;
}