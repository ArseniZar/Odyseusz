export interface InputProps {
  type?: string;
  label: string;
  placeholder?: string;
  value?: string;
  tooltipText?: string;
  className?: string;
  classInput?: string;
  ref?: React.Ref<HTMLInputElement>
  onChange?: (value: any) => void;
  onFocus?: (e:React.FocusEvent<HTMLInputElement>) =>  void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}
