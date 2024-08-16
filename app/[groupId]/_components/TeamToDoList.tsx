'use client';

import TodoListModal from '@/components/modal-template/TodoListModal';
import { reorderTaskList } from '@/lib/api/taskList';
import { GroupTask } from '@ccc-types';
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { useEffect, useState } from 'react';

import TeamToDoListCard from './TeamToDoListCard';

function TeamToDoList({
  taskLists,
  groupId,
}: {
  taskLists: GroupTask[];
  groupId: number;
}) {
  // 드래그앤 드랍을 위해 state 추가
  const [taskListsData, setTaskListsData] = useState(taskLists);

  useEffect(() => {
    // 데이터가 일치하는 않는다는 콘솔 오류가 떠서 추가
    if (JSON.stringify(taskLists) !== JSON.stringify(taskListsData)) {
      setTaskListsData(taskLists);
    }
  }, [taskLists, taskListsData]);

  // 마우스가 30픽셀 이상 이동해야 드래그 시작, 없으면 링크가 작동되며 수정 삭제가 안됨
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 30,
      },
    })
  );

  // 드래그앤 드랍 로직, 전 인덱스와 바꿀 인덱스를 바꿔주며 서버에 요청
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setTaskListsData((prev) => {
        const oldIndex = prev.findIndex(
          (taskList) => taskList.id === active.id
        );
        const newIndex = prev.findIndex((taskList) => taskList.id === over.id);
        reorderTaskList(groupId, active.id as number, {
          displayIndex: newIndex,
        });
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-x-2">
          <p className="font-medium">할 일 목록</p>
          <p className="text-text-default">({taskListsData?.length ?? 0}개)</p>
        </div>
        <TodoListModal groupId={groupId} />
      </div>
      <div className="flex flex-col gap-4">
        {taskListsData.length ? (
          <DndContext
            sensors={sensors}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={taskListsData}>
              {taskListsData.map((taskList) => (
                <TeamToDoListCard
                  key={taskList.id}
                  name={taskList.name}
                  totalToDo={taskList.tasks.length}
                  completedToDo={
                    taskList.tasks.filter((task) => task.doneAt !== null).length
                  }
                  groupId={groupId}
                  taskListId={taskList.id}
                />
              ))}
            </SortableContext>
          </DndContext>
        ) : (
          <div className="flex w-full items-center justify-center py-16">
            <p className="text-sm font-medium text-text-default">
              아직 할 일 목록이 없습니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
export default TeamToDoList;
