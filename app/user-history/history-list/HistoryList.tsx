'use client';

import { DateString, Task } from '@ccc-types';
import React from 'react';

import HistoryItem from '../history-item/HistoryItem';

interface HistoryTask extends Task {
  deletedAt: DateString;
}

interface HistoryListProps {
  tasks: HistoryTask[];
}

const HistoryList = ({ tasks }: HistoryListProps) => (
  <div className="flex w-full flex-col gap-4">
    <h2>{new Date(tasks[0].deletedAt).toLocaleDateString()}</h2>
    {tasks.map((task) => (
      <HistoryItem key={task.id} task={task} />
    ))}
  </div>
);

export default HistoryList;
