'use client';

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

/* eslint-disable jsx-a11y/click-events-have-key-events */
import fetchAPI from '@/lib/api/fetchAPI';
import { GroupTask, Id } from '@ccc-types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

function TaskListTags({ groupId }: { groupId: Id }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [tag, setTag] = useState<GroupTask[] | null>([]);

  const fetchListData = async (value: Id) => {
    const res = await fetchAPI.Group(value);
    if (res.data) {
      setTag(res.data.taskLists);
    }
  };

  const handleClick = (taskId: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('task-list', taskId);
    replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    fetchListData(groupId);
  }, [groupId]);

  return (
    <ul className="task-list-scroll my-2 mb-[-20px] flex gap-3 overflow-x-auto">
      {tag?.map((item) => (
        <li
          key={item.id}
          onClick={() => {
            handleClick(item.id.toString());
          }}
          className={`cursor-pointer whitespace-nowrap text-base font-medium text-text-default ${
            item.id === Number(searchParams.get('task-list')) &&
            'border-b-2 border-text-primary pb-[3px] text-text-primary'
          }`}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
}
export default TaskListTags;
