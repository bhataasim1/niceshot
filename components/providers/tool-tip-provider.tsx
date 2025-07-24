import { TooltipProvider } from '@/components/ui/tooltip';

export const ToolTipProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <TooltipProvider>{children}</TooltipProvider>;
};
