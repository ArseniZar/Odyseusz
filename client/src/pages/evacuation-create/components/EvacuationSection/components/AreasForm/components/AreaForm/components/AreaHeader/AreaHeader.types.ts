export interface AreaHeaderProps {
  title: string;
  areaNumber: number;
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