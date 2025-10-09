import { cn } from '@/common/utils';

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
}

const SectionContainer: React.FC<SectionContainerProps> = ({ children, className }) => {
  return <div className={cn('container mx-auto py-22 px-4 sm:px-6 lg:px-8', className)}>{children}</div>;
};

export default SectionContainer;
