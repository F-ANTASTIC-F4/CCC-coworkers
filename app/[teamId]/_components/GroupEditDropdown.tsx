import DeleteTodoModal from '@/components/modal-template/DeleteTodoModal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import BasicEditIcon from '@/public/icons/basic_edit_icon.svg';
import * as React from 'react';

import EditGroupNameModal from './EditGroupNameModal';

function GroupEditDropdown({
  title = '',
  groupId,
}: {
  title?: string;
  groupId: number;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="수정 및 삭제 기능 제공 드롭다운"
          className="outline-none"
        >
          <BasicEditIcon />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        onClick={(e: React.MouseEvent<HTMLElement>) => {
          e.stopPropagation();
        }}
      >
        <DropdownMenuItem className="flex cursor-pointer flex-col justify-center">
          <EditGroupNameModal groupId={groupId} />
        </DropdownMenuItem>
        <DropdownMenuItem className="flex flex-col justify-center" asChild>
          <DeleteTodoModal title={title} className="w-full cursor-pointer" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default GroupEditDropdown;
