import MakeTodoModal from '@/components/modal-template/MakeTodoModal';
import fetchAPI from '@/lib/api/fetchAPI';
import { DateString, Id } from '@ccc-types';
import React from 'react';

import TaskItem from './TaskItem';

async function TaskList({
  groupId,
  searchParams,
}: {
  groupId: Id;
  searchParams?: { 'task-list': Id; date: DateString };
}) {
  const tasksRes = await fetchAPI.TaskList(
    groupId,
    Number(searchParams?.['task-list']),
    searchParams!.date
  );
  const tasksData = tasksRes.data;

  return (
    <div className="flex h-full flex-grow flex-col">
      {tasksData?.tasks?.length !== 0 ? (
        <div className="mt-3 flex h-full flex-col gap-5 pb-[45px]">
          {tasksData?.tasks?.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      ) : (
        <div className="mb-[120px] flex h-full items-center justify-center">
          <p className="text-sm font-medium text-text-default">
            아직 할 일이 없습니다.
            <br />할 일을 추가해보세요.
          </p>
        </div>
      )}

      <div className="sticky bottom-5 mx-auto flex w-full max-w-[1232px] justify-end xl:px-0">
        <MakeTodoModal
          className="z-10 ml-auto"
          groupId={groupId}
          taskListId={Number(searchParams?.['task-list'])}
        />
      </div>
    </div>
  );
}

export default TaskList;
