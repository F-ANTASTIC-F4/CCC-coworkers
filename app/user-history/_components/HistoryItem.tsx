import CheckIcon from '@/public/icons/user-history/check_icon.svg';
import HamburgerIcon from '@/public/icons/user-history/hamburger_icon.svg';
import { Task } from '@ccc-types';
import React from 'react';

function HistoryItem({ task }: { task: Task }) {
  return (
    <div className="flex items-center gap-1 rounded-lg bg-customBackground-secondary px-[14px] py-[10px]">
      <CheckIcon />
      <p className="mr-[10px]">
        <s>{task.description}</s>
      </p>
      <HamburgerIcon
        className="ml-auto cursor-pointer"
        width={16}
        height={16}
      />
    </div>
  );
}

export default HistoryItem;
