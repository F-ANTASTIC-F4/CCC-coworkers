import cn from '@/lib/utils';
import * as React from 'react';

interface LandingCardProps extends React.HTMLAttributes<HTMLDivElement> {}
interface LandingContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

const LandingCard = React.forwardRef<HTMLDivElement, LandingCardProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex h-[467px] flex-col rounded-xl border md:h-[354px] md:flex-row md:justify-center xl:h-[419px]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
LandingCard.displayName = 'LandingCard';

const LandingContainer = React.forwardRef<
  HTMLDivElement,
  LandingContainerProps
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'relative mx-auto h-full w-[235px] md:mx-0 md:w-full',
      className
    )}
    {...props}
  >
    {children}
  </div>
));
LandingContainer.displayName = 'LandingContainer';

export { LandingCard, LandingContainer };
