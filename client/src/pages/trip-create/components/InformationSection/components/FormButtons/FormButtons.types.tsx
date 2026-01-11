import type { InformationSectionConfig } from "../../../../config/informationSection.config.type";

export interface FormButtonsProps {
  infoText: InformationSectionConfig;
  className?: string;
  onCancel?: () => void;
  onSubmit?: () => void;
}
