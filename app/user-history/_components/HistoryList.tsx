'use client';

import CheckIcon from '@/public/icons/user-history/check_icon.svg';
import HamburgerIcon from '@/public/icons/user-history/hamburger_icon.svg';
import { formatToDate } from '@/utils/dateFormat';
import { Task } from '@ccc-types';
import React from 'react';

const HistoryList = ({ task }: { task: Task }) => {
  const date = formatToDate(task.deletedAt, 'dotFormat');

  return (
    <div className="flex w-full flex-col gap-4">
      <h2>{date}</h2>
      <div className="flex items-center gap-1 rounded-lg bg-customBackground-secondary px-[14px] py-[10px]">
        <CheckIcon />
        <p className="mr-[10px]">
          <s>{task.description}</s>
        </p>
        <HamburgerIcon className="ml-auto cursor-pointer" />
      </div>
    </div>
  );
};

export default HistoryList;
