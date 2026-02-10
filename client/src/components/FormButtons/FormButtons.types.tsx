import type { Information } from "@/types/config";

export interface FormButtonsProps<T extends Information> {
  infoText: T;
  className?: string;
  onCancel: () => void;
  onSubmit: () => void;
}
