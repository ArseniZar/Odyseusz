import type { Evacuation } from "@/types/domain/evacuation";
import type { EvacuationsSectionConfig } from "../../../../config/evacuationsSection.config.types";

type EvacuationInfo = Pick<Evacuation, 'status' | 'name' | 'reason' | 'description' | 'areas' | 'collectionPoints' | 'assistants' | "dataLastActivated" | "canEdit">;

export interface EvacuationInformationProps extends EvacuationInfo {
    infoText: EvacuationsSectionConfig;
    onActive: () => void;
    onCancel: () => void;
    onDelete: () => void;
    onEdit: () => void;
}