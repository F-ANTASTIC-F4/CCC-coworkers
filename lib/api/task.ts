'use server';

import { ENDPOINTS } from '@/lib/api/API_CONSTANTS';
import client from '@/lib/api/client/server';
import { Id, Recurring, Task } from '@ccc-types';

export async function createTask(
  groupId: Id,
  taskListId: Id,
  data: Partial<
    Pick<
      Recurring,
      'name' | 'description' | 'displayIndex' | 'frequencyType' | 'monthDay'
    >
  >
): Promise<Recurring> {
  const { data: response, error } = await client<Recurring>(
    ENDPOINTS.TASK.ACTIONS(groupId, taskListId),
    {
      method: 'post',
      data,
    }
  );
  if (error) {
    throw new Error(
      `TaskList${taskListId}의 tasks를 생성하는 중 중 에러가 발생했습니다`,
      { cause: error }
    );
  }
  return response;
}

export async function updateTask(
  groupId: Id,
  taskListId: Id,
  taskId: Id,
  data: Pick<Task, 'name' | 'description'> & {
    done: boolean;
    displayIndex?: number;
  }
): Promise<Task> {
  const { data: response, error } = await client<Task>(
    ENDPOINTS.TASK.ACTIONS_ITEM(groupId, taskListId, taskId),
    {
      method: 'patch',
      data,
    }
  );
  if (error) {
    throw new Error(
      `TaskList${taskListId}의 tasks를 수정하는 중 에러가 발생했습니다`,
      { cause: error }
    );
  }
  return response;
}

export async function deleteTask(
  groupId: Id,
  taskListId: Id,
  taskId: Id
): Promise<boolean> {
  const { error } = await client<void>(
    ENDPOINTS.TASK.ACTIONS_ITEM(groupId, taskListId, taskId),
    {
      method: 'delete',
    }
  );
  if (error) {
    throw new Error(
      `TaskList${taskListId}의 tasks를 삭제하는 중 에러가 발생했습니다.`,
      { cause: error }
    );
  }
  return true;
}

// 반복할일 삭제
export async function deleteTaskAll(
  groupId: Id,
  taskListId: Id,
  taskId: Id
): Promise<boolean> {
  const { error } = await client<void>(
    ENDPOINTS.TASK.DELETE_ALL_TASKS(groupId, taskListId, taskId),
    {
      method: 'delete',
    }
  );
  if (error) {
    throw new Error(
      `TaskList${taskListId}의 tasks를 반복 삭제하는 중 에러가 발생했습니다.`,
      { cause: error }
    );
  }
  return true;
}
