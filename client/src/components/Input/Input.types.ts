export interface InputProps {
  type?: "checkbox" | "text";
  label: string;
  placeholder?: string;
  value?: any;
  tooltipText?: string;
  error?: string;
  className?: string;
  classInput?: string;
  ref?: React.Ref<HTMLInputElement>
  onChange?: (value: any) => void;
  onFocus?: (e:React.FocusEvent<HTMLInputElement>) =>  void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}
