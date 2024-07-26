'use client';

import CloseICon from '@/public/icons/modal/close_icon.svg';
import { KeyboardEvent, MouseEvent, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({
  children,
  setOpen,
  className = '',
  hasCloseIcon = false,
  setClose,
}: {
  children: React.ReactNode;
  setOpen: boolean;
  className?: string;
  hasCloseIcon?: boolean;
  setClose: () => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutToClose = (e: MouseEvent<HTMLElement>) => {
    const modalNode = modalRef.current;
    if (modalNode && !modalNode.contains(e.target as Node)) {
      setClose();
    }
  };

  useEffect(() => {
    const handleKeyDownToEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setClose();
      }
    };

    const listener = (e: Event) =>
      handleKeyDownToEscape(e as unknown as KeyboardEvent);

    window.addEventListener('keydown', listener);

    return () => {
      window.removeEventListener('keydown', listener);
    };
  }, [setClose]);

  if (!setOpen) {
    return null;
  }

  if (typeof window === 'undefined') {
    return null;
  }

  return createPortal(
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className="fixed inset-0 flex h-screen w-screen items-center justify-center bg-black bg-opacity-30"
      onClick={handleClickOutToClose}
    >
      <div
        className={`fixed bottom-0 flex h-fit w-full max-w-[384px] flex-col items-center justify-center rounded-tl-[24px] rounded-tr-[24px] bg-customBackground-secondary px-[16px] pb-[32px] ${hasCloseIcon ? 'pt-[16px]' : 'pt-[32px]'} mobileAnimation md:otherAnimation md:static md:rounded-xl ${className} gap-[24px]`}
        ref={modalRef}
      >
        {hasCloseIcon && (
          <CloseICon className="ml-auto cursor-pointer" onClick={setClose} />
        )}
        {children}
      </div>
    </div>,
    document.body
  );
}
