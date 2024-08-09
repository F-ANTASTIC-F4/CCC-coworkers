import EditDeleteDropdown from '@/components/dropdown-template/EditDeleteDropdown';
import CalenderNoBtnIcon from '@/public/icons/list/calender_no_btn.svg';
import ClockIcon from '@/public/icons/list/clock_icon.svg';
import CommentIcon from '@/public/icons/list/comment_icon.svg';
import DailyIcon from '@/public/icons/list/daily_task_icon.svg';
import { formatToDate, formatToTime } from '@/utils/dateFormat';
import { Task } from '@ccc-types';
import React from 'react';

import CheckboxReactHookFormSingle from './Checkbox';
import CommentSheet from './CommentSheet';

const frequencyTypeObj = {
  DAILY: '매일 반복',
  WEEKLY: '주 반복',
  MONTHLY: '월 반복',
  ONCE: '한번',
};

const textClass = `text-xs font-normal text-text-default`;

function TaskItem({ name, date, frequency, doneAt, commentCount, id }: Task) {
  const [isDone, setIsDone] = React.useState<boolean>(!!doneAt);
  const taskType = frequencyTypeObj[frequency];

  const handleDoneState = (value: boolean) => {
    setIsDone(value);
  };

  return (
    <CommentSheet isDone={isDone} id={id} handleClick={handleDoneState}>
      <div className="flex w-full cursor-pointer flex-col gap-3 rounded-[10px] bg-background-secondary px-[14px] py-[12px]">
        <div className="flex w-full justify-between">
          <CheckboxReactHookFormSingle
            id={id}
            task={name}
            isDone={isDone}
            handleClick={handleDoneState}
          />
          <div className="flex items-center gap-2">
            <div className="flex gap-[2px]">
              <CommentIcon />
              <p className={textClass}>{commentCount}</p>
            </div>
            <EditDeleteDropdown title={name} />
          </div>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-1">
            <CalenderNoBtnIcon />
            <p className={textClass}>{formatToDate(date, 'koreanFullDate')}</p>
          </div>
          <div className="flex items-center gap-1">
            <ClockIcon />
            <p className={textClass}>{formatToTime(date)}</p>
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
