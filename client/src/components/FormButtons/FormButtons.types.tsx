import type { Information } from "@/types/all_types";

export interface FormButtonsProps<T extends Information> {
  infoText: T;
  className?: string;
  onCancel: () => void;
  onSubmit: () => void;
}
