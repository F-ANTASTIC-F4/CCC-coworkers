'use client';

import TaskEditDeleteDropdown from '@/components/dropdown-template/TaskEditDeleteDropdown';
import frequencyTypeObj from '@/constants/frequencyType';
import { deleteTask } from '@/lib/api/task';
import { dateFormatter } from '@/lib/utils';
import GearIcon from '@/public/icons/gear.svg';
import CalenderNoBtnIcon from '@/public/icons/list/calender_no_btn.svg';
import ClockIcon from '@/public/icons/list/clock_icon.svg';
import CommentIcon from '@/public/icons/list/comment_icon.svg';
import DailyIcon from '@/public/icons/list/daily_task_icon.svg';
import { DetailTask } from '@ccc-types';
import { useRouter } from 'next/navigation';
import React from 'react';

import CheckboxReactHookFormSingle from './Checkbox';
import CommentSheet from './CommentSheet';

const textClass = `text-xs font-normal text-text-default`;

function TaskItem({ task }: { task: DetailTask }) {
  const [isDone, setIsDone] = React.useState<boolean>(!!task.doneAt);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const taskType = frequencyTypeObj[task.frequency];
  const router = useRouter();

  const handleDoneState = (value: boolean) => {
    setIsDone(value);
  };

  const handleLoading = (value: boolean) => {
    setIsLoading(value);
  };

  const handleDeleteClick = async () => {
    try {
      handleLoading(true);
      await deleteTask(task.id);
      router.refresh();
    } catch (e) {
      alert('할 일 삭제에 실패하였습니다.');
    }
  };

  return (
    <CommentSheet isDone={isDone} task={task} handleClick={handleDoneState}>
      <div
        className={`relative flex w-full cursor-pointer flex-col gap-3 rounded-[10px] px-[14px] py-[12px] ${isLoading ? 'bg-background-secondary/75' : 'bg-background-secondary'}`}
      >
        {isLoading && (
          <GearIcon className="rolling-gear absolute left-[50%] top-[35%]" />
        )}
        <div className="flex w-full justify-between">
          <CheckboxReactHookFormSingle
            id={task.id}
            task={task.name}
            isDone={isDone}
            handleClick={handleDoneState}
          />
          <div className="flex items-center gap-2">
            <div className="flex gap-[2px]">
              <CommentIcon />
              <p className={textClass}>{task.commentCount}</p>
            </div>
            <TaskEditDeleteDropdown
              title={task.name}
              onClick={handleDeleteClick}
              taskId={task.id}
            />
          </div>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-1">
            <CalenderNoBtnIcon />
            <p className={textClass}>
              {dateFormatter.toConvertDate(task.updatedAt, 'koreanFullDate')}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <ClockIcon />
            <p className={textClass}>{dateFormatter.toTime(task.updatedAt)}</p>
          </div>
          <div className="flex items-center gap-1">
            <DailyIcon />
            <p className={textClass}>{taskType}</p>
          </div>
        </div>
      </div>
    </CommentSheet>
  );
}

export default TaskItem;
