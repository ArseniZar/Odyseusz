import type { InformationSectionConfig } from "../../../../config/informationSection.config.types";

export interface FormButtonsProps {
  infoText: InformationSectionConfig;
  className?: string;
  onCancel?: () => void;
  onSubmit?: () => void;
}
