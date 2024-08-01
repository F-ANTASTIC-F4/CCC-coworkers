'use client';

import DatePicker from '@/app/list/_component/DatePicker';
import TodoListModal from '@/components/modal-templete/TodoListModal';
import LeftButtonIcon from '@/public/icons/list/left_button_icon.svg';
import RightButtonIcon from '@/public/icons/list/right_button_icon.svg';
import { formatToDate } from '@/utils/dateFormat';
import { GroupTask } from '@ccc-types';
import React from 'react';

import TaskItem from './TaskItem';

const ListMockData: GroupTask = {
  groupId: 0,
  displayIndex: 0,
  updatedAt: '2024-07-31T09:35:03.957Z',
  createdAt: '2024-07-31T09:35:03.957Z',
  name: '법인 설립',
  id: 1,
  tasks: [
    {
      deletedAt: '2024-07-31T09:35:03.957Z',
      recurringId: 0,
      frequency: 'DAILY',
      userId: 0,
      date: '2024-07-31T09:35:03.957Z',
      doneAt: '2024-07-31T09:35:03.957Z',
      updatedAt: '2024-07-31T09:35:03.957Z',
      name: '등기 비용 안내드리기',
      id: 1,
    },
    {
      deletedAt: '2024-07-31T09:35:03.957Z',
      recurringId: 0,
      frequency: 'DAILY',
      userId: 0,
      date: '2024-07-31T09:35:03.957Z',
      doneAt: '2024-07-31T09:35:03.957Z',
      updatedAt: '2024-07-31T09:35:03.957Z',
      name: '사기치면 안된다!',
      id: 2,
    },
    {
      deletedAt: '2024-07-31T09:35:03.957Z',
      recurringId: 0,
      frequency: 'DAILY',
      userId: 0,
      date: '2024-07-31T09:35:03.957Z',
      doneAt: '2024-07-31T09:35:03.957Z',
      updatedAt: '2024-07-31T09:35:03.957Z',
      name: '항상 정의롭게 벌자',
      id: 3,
    },
  ],
};

function TaskList({ lists }: { lists: GroupTask[] }) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-3">
        <span className="text-[16px] font-medium text-text-primary">
          {formatToDate(ListMockData.createdAt, 'monthAndDay')}
        </span>
        <div className="relative top-[1px] flex gap-1">
          <button type="button" aria-label="날짜 변경 버튼(왼쪽)">
            <LeftButtonIcon />
          </button>
          <button type="button" aria-label="날짜 변경 버튼(오른쪽)">
            <RightButtonIcon />
          </button>
        </div>
        <DatePicker />
        <TodoListModal className="ml-auto" />
      </div>
      <ul className="my-2 flex gap-3">
        {lists.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      {ListMockData.tasks.map((task) => (
        <TaskItem key={task.id} {...task} />
      ))}
    </div>
  );
}

export default TaskList;
