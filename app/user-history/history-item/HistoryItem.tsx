import CheckIcon from '@/public/icons/user-history/check_icon.svg';
import HamburgerIcon from '@/public/icons/user-history/hamburger_icon.svg';
import React from 'react';

export interface Task {
  deletedAt: Date | string;
  userId: number;
  recurringId: number;
  frequency: string;
  date: Date | string;
  doneAt: Date | string;
  description: string;
  name: string;
  updatedAt: Date | string;
  id: number;
}

interface HistoryItemProps {
  task: Task;
}

const HistoryItem = ({ task }: HistoryItemProps) => (
  <div className="flex items-center gap-1 rounded-lg bg-customBackground-secondary px-[14px] py-[10px]">
    <CheckIcon />
    <p className="mr-[10px]">
      <s>{task.description}</s>
    </p>
    <HamburgerIcon className="ml-auto cursor-pointer" />
  </div>
);

export default HistoryItem;
