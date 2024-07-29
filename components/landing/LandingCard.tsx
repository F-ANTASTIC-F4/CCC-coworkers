import cn from '@/lib/utils';
import * as React from 'react';

interface LandingCardProps extends React.HTMLAttributes<HTMLDivElement> {}

const LandingCard = React.forwardRef<HTMLDivElement, LandingCardProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'h-[467px] rounded-xl border md:h-[354px] xl:h-[419px]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
LandingCard.displayName = 'LandingCard';

// eslint-disable-next-line import/prefer-default-export
export { LandingCard };
