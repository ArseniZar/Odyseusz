export interface PointHeaderProps {
  title: string;
  pointNumber: number;
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