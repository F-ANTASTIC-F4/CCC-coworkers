import MakeTodoModal from '@/components/modal-template/MakeTodoModal';
import TodoListModal from '@/components/modal-template/TodoListModal';
import fetchAPI from '@/lib/api/fetchAPI';
import { DateString, Id } from '@ccc-types';
import React from 'react';

import TaskDateController from './TaskDateController';
import TaskItem from './TaskItem';
import TaskListTags from './TaskListTags';

async function TaskList({
  groupId,
  searchParams,
}: {
  groupId: Id;
  searchParams?: { 'task-list': Id; date: DateString };
}) {
  // 테스크 리스트를 불러오기 위한 패칭
  let taskListsData;
  const res = await fetchAPI.Group(groupId);
  if (res.error) {
    console.log(res.error);
  } else {
    taskListsData = res.data.taskLists;
  }

  if (!taskListsData) {
    return <div>no data</div>;
  }

  // 테슼스크들을 불러오기 위한 패칭
  const { data: tasksData } = await fetchAPI.TaskList(
    groupId,
    Number(searchParams?.['task-list']),
    searchParams!.date
  );

  return (
    <div className="flex h-full flex-grow flex-col">
      <div className="flex items-center">
        <TaskDateController />
        <TodoListModal groupId={groupId} className="ml-auto" />
      </div>
      {taskListsData?.length !== 0 ? (
        <>
          <TaskListTags taskListsData={taskListsData} />
          {tasksData?.tasks?.length !== 0 ? (
            <div className="mt-3 flex min-h-full flex-col gap-5 pb-[45px]">
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
        </>
      ) : (
        <div className="mb-[120px] flex h-full items-center justify-center">
          <p className="text-sm font-medium text-text-default">
            아직 할 일 목록이 없습니다.
            <br />
            새로운 목록을 추가해주세요.
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
