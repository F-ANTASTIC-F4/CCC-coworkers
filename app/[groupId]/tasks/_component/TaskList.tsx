'use client';

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

/* eslint-disable jsx-a11y/click-events-have-key-events */
import MakeTodoModal from '@/components/modal-template/MakeTodoModal';
import TodoListModal from '@/components/modal-template/TodoListModal';
import fetchAPI from '@/lib/api/fetchAPI';
import { dateFormatter } from '@/lib/utils';
import LeftButtonIcon from '@/public/icons/list/left_button_icon.svg';
import RightButtonIcon from '@/public/icons/list/right_button_icon.svg';
import { GroupTask, Id } from '@ccc-types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef } from 'react';

import DatePicker from './DatePicker';
import TaskItem from './TaskItem';

function TaskList({ data, groupId }: { data: GroupTask[]; groupId: Id }) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const { replace } = useRouter();
  const oneDay = 24 * 60 * 60 * 1000;

  const dataListRef = useRef<GroupTask | undefined>(undefined);
  const forceRender = useRef(false);

  const fetchData = async (
    groupIdValue: Id,
    taskListIdValue: Id,
    dateValue: string
  ) => {
    const res = await fetchAPI.TaskList(
      groupIdValue,
      taskListIdValue,
      dateValue
    );
    if (res?.data) {
      dataListRef.current = res.data;
      forceRender.current = !forceRender.current; // 리렌더 트리거
    } else {
      console.error(res?.error);
    }
  };

  useEffect(() => {
    const taskListId = Number(params.get('task-list'));
    const date = params.get('date');
    if (taskListId && date) {
      fetchData(groupId, taskListId, date);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupId, searchParams]);

  if (!dataListRef.current) {
    return <div>no</div>;
  }

  return (
    <div className="flex h-full flex-grow flex-col">
      <div className="flex items-center">
        <span className="w-[100px] text-[16px] font-medium text-text-primary">
          {params.get('date')
            ? dateFormatter.toConvertDate(
                params.get('date') as string,
                'monthAndDay'
              )
            : '날짜를 불러올 수 없습니다. '}
        </span>
        <div className="relative top-[1px] mr-4 flex gap-2">
          <button
            type="button"
            aria-label="날짜 변경 버튼(왼쪽)"
            onClick={() => {
              params.set(
                'date',
                new Date(new Date().getTime() - oneDay).toString()
              );
              replace(`${pathname}?${params.toString()}`);
            }}
          >
            <LeftButtonIcon />
          </button>
          <button
            type="button"
            aria-label="날짜 변경 버튼(오른쪽)"
            onClick={() => {
              params.set(
                'date',
                new Date(new Date().getTime() + oneDay).toString()
              );
              replace(`${pathname}?${params.toString()}`);
            }}
          >
            <RightButtonIcon />
          </button>
        </div>
        <DatePicker
          onClick={(day) => {
            if (day) {
              params.set('date', day.toString());
              replace(`${pathname}?${params.toString()}`);
            }
          }}
        />
        <TodoListModal groupId={groupId} className="ml-auto" />
      </div>
      {data?.length !== 0 ? (
        <>
          <ul className="my-2 flex gap-3">
            {data?.map((item) => (
              <li
                key={item.id}
                onClick={() => {
                  params.set('task-list', item.id.toString());
                  replace(`${pathname}?${params.toString()}`);
                }}
                className={`cursor-pointer text-base font-medium text-text-default ${
                  item.id === dataListRef.current?.id &&
                  'border-b-2 border-text-primary pb-[3px] text-text-primary'
                }`}
              >
                {item.name}
              </li>
            ))}
          </ul>

          {dataListRef.current?.tasks?.length !== 0 ? (
            <div className="mt-3 flex min-h-full flex-col gap-5 pb-[45px]">
              {dataListRef.current.tasks.map((task) => (
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
          taskListId={dataListRef.current?.id}
        />
      </div>
    </div>
  );
}

export default TaskList;
