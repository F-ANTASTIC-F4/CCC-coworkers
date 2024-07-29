'use client';

import React from 'react';

import HistoryItem from '../history-item/HistoryItem';

interface Task {
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

interface HistoryListProps {
  tasks: Task[];
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
