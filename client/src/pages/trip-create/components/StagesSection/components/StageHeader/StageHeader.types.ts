export interface StageHeaderProps {
  title: string;
  stageNumber: number;
  isOpen: boolean;
  className?: string;
  onToggle: () => void;
  onDelete: () => void;
  icons: {
    iconTrash: string;
    iconOpen: string;
    iconClose: string;
  };
}
