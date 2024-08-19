import Loading from '@/components/common/loading';
import TodoListModal from '@/components/modal-template/TodoListModal';
import { DateString, Id } from '@ccc-types';
import { Suspense } from 'react';

import TaskDateController from './_component/TaskDateController';
import TaskList from './_component/TaskList';
import TaskListTags from './_component/TaskListTags';

async function ListPage({
  params,
  searchParams,
}: {
  params: { groupId: Id };
  searchParams?: { 'task-list': Id; date: DateString };
}) {
  const { groupId } = params;

  return (
    <section className="min-screen relative">
      <div className="flex h-full w-full flex-col gap-6">
        <h1 className="mr-auto mt-6 text-[18px] font-bold text-text-primary">
          할 일
        </h1>
        <div className="mb-[-5px] flex items-center">
          <TaskDateController />
          <TodoListModal groupId={groupId} className="ml-auto" />
        </div>
        {groupId && <TaskListTags groupId={groupId} />}
        <Suspense
          key={`${groupId}-${searchParams?.['task-list']}-${searchParams?.date}`}
          fallback={<Loading />}
        >
          <TaskList groupId={groupId} searchParams={searchParams} />
        </Suspense>
      </div>
    </section>
  );
}

export default ListPage;
