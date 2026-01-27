export interface TextareaInputProps {
  label: string;
  placeholder?: string;
  value?: any;
  tooltipText?: string;
  error?: string;
  className?: string;
  classTextareaWrapper?: string;
  classTextarea?: string;
  onChange?: (value: any) => void;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
};

