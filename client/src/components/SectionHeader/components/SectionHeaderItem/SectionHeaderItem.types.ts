export interface SectionHeaderItemProps {
  id: string;     
  title: string;           
  isActive: boolean;       
  onClick: (id: string) => void;
}
