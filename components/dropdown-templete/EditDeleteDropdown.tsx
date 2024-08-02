import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import HamburgerIcon from '@/public/icons/user-history/hamburger_icon.svg';
import * as React from 'react';

import DeleteTodoModal from '../modal-templete/DeleteTodoModal';

interface DropdownProps {
  title?: string;
  className?: string;
}

function EditDeleteDropdown({
  title = '',
  className = 'w-[16px] h-[16px]',
}: DropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="수정 및 삭제 기능 제공 드롭다운"
          className="outline-none"
        >
          <HamburgerIcon
            className={`${className} hover:stroke-text-tertiary`}
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        onClick={(e: React.MouseEvent<HTMLElement>) => {
          e.stopPropagation();
        }}
      >
        <DropdownMenuItem className="flex cursor-pointer flex-col justify-center">
          수정하기
        </DropdownMenuItem>
        <DropdownMenuItem className="flex flex-col justify-center" asChild>
          <DeleteTodoModal title={title} className="w-full cursor-pointer" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default EditDeleteDropdown;
