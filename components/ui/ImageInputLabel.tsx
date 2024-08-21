import { cn } from '@/lib/utils';
import EditButton from '@/public/icons/btn_edit.svg';

import { Skeleton } from './skeleton';

interface ImageInputWrapperProps {
  className?: string;
  children: React.ReactNode;
  suspenseFallback?: React.ReactNode;
  [key: string]: unknown;
}

interface ImageInputContentProps {
  className?: string;
  imagePreview?: string | null;
  children: React.ReactNode;
  isUploading?: boolean;
}

const ImageInputWrapper = ({
  className = '',
  children,
  ...props
}: ImageInputWrapperProps) => (
  <>
    <div
      className={cn(
        'bg-customBackground-tertiary relative flex items-center justify-center',
        className
      )}
      {...props}
    >
      {children}
    </div>
  </>
);

const CircularImageInputWrapper = ({
  className = '',
  children,
  ...props
}: ImageInputWrapperProps) => (
  <ImageInputWrapper
    className={cn(
      'h-[64px] w-[64px] rounded-full border-[2px] border-customBorder-primary',
      className
    )}
    {...props}
  >
    {children}
    <EditButton
      className="absolute bottom-[-4px] right-[-4px]"
      stroke="var(--background)"
    />
  </ImageInputWrapper>
);

const ImageInputContent = ({
  className = '',
  imagePreview,
  isUploading = false,
  children,
}: ImageInputContentProps) => {
  if (imagePreview)
    return (
      // REVIEW - wrapper를 안에 넣어서 합성 패턴을 이용했는데 다른 좋은 방법이 있을까요?
      <CircularImageInputWrapper>
        <>
          {isUploading ? (
            <Skeleton className="z-0 h-full w-full rounded-full" />
          ) : (
            <img
              src={imagePreview}
              alt="Profile Preview"
              className={cn(
                'h-full w-full rounded-full object-cover',
                className
              )}
            />
          )}
        </>
      </CircularImageInputWrapper>
    );

  return children;
};

const BoardImageInputContent = ({
  className = '',
  imagePreview,
  children,
}: ImageInputContentProps) => {
  if (imagePreview)
    return (
      // REVIEW - wrapper를 안에 넣어서 합성 패턴을 이용했는데 다른 좋은 방법이 있을까요?
      <img
        src={imagePreview}
        alt="Profile Preview"
        className={cn('size-40 rounded-xl object-cover md:size-60', className)}
      />
    );

  return children;
};

const ImageInputUI = Object.assign(ImageInputWrapper, {
  Content: ImageInputContent,
  BoardContent: BoardImageInputContent,
});

export default ImageInputUI;
