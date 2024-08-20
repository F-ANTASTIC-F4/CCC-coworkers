'use server';

import ENDPOINTS from '@/lib/api/ENDPOINTS';
import client from '@/lib/api/client/client';
import { GroupTask, Id, Recurring, Task } from '@ccc-types';

export async function createTask(
  groupId: Id,
  taskListId: Id,
  data: Partial<
    Pick<
      Recurring,
      | 'name'
      | 'description'
      | 'displayIndex'
      | 'frequencyType'
      | 'monthDay'
      | 'weekDays'
    >
  >
) {
  const { data: response, error } = await client<GroupTask>(
    ENDPOINTS.TASK.RECURRING(groupId, taskListId),
    {
      method: 'post',
      data,
    }
  );
  if (error) {
    return {
      error: {
        info: `TaskList${taskListId}의 tasks를 생성하는 중 중 에러가 발생했습니다.`,
        message: error.message,
        ...error.cause,
      },
    };
  }
  return { data: response };
}

export async function updateTask(
  taskId: Id,
  data: {
    name?: string;
    description?: string;
    done?: boolean;
  }
) {
  const { data: response, error } = await client<Task>(
    ENDPOINTS.TASK.ACTIONS_ITEM(taskId),
    {
      method: 'patch',
      data,
    }
  );
  if (error) {
    return {
      error: {
        info: `task${taskId}의 tasks를 수정하는 중 에러가 발생했습니다`,
        message: error.message,
        ...error.cause,
      },
    };
  }
  return { data: response };
}

export async function deleteTask(taskId: Id) {
  const { error } = await client<void>(ENDPOINTS.TASK.ACTIONS_ITEM(taskId), {
    method: 'delete',
  });
  if (error) {
    return {
      error: {
        info: `${taskId}번 할일을 삭제하는 중 에러가 발생했습니다.`,
        message: error.message,
        ...error.cause,
      },
    };
  }
  return { data: true };
}

// 반복할일 삭제
export async function deleteRecurringTask(taskId: Id) {
  const { error } = await client<void>(
    ENDPOINTS.TASK.DELETE_RECURRING_TASKS(taskId),
    {
      method: 'delete',
    }
  );
  if (error) {
    return {
      error: {
        info: `할일을 삭제하는 도중 에러가 발생했습니다.`,
        message: error.message,
        ...error.cause,
      },
    };
  }
  return { data: true };
}
