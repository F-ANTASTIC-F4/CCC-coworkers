declare module '@ccc-types' {
  export type DisplayIndex = number; // integer($int32), minimum: 0

  export type FrequencyType = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'ONCE';

  export interface Task {
    deletedAt: DateString;
    recurringId: Id;
    frequency: FrequencyType;
    userId: Id;
    date: DateString;
    doneAt?: DateString | null; // nullable: true
    description?: string;
    updatedAt: DateString;
    name: string;
    id: Id;
    commentCount: number;
  }

  // NOTE - history API 리스폰스 부분의 타입을 정의했는데 더 나은 방법이 있었을까요..?
  export type TasksDone = Task[];

  export interface DataStructure {
    tasksDone: TasksDone;
  }

  export type TaskHistory = DataStructure[];

  export interface GroupTask {
    groupId: Id;
    displayIndex: number;
    updatedAt: DateString;
    createdAt: DateString;
    name: Nickname;
    id: Id;
    tasks: Task[];
  }

  export interface Comment {
    userId: number;
    taskId: number;
    updatedAt: DateString;
    createdAt: DateString;
    content: string;
    id: number;
  }

  export interface Recurring {
    groupId: number;
    taskListId: number;
    monthDay: number;
    weekDays: number[];
    frequencyType: FrequencyType;
    displayIndex: number;
    updatedAt: DateString;
    createdAt: DateString;
    description: string;
    name: string;
    id: number;
  }

  export interface DetailTask extends Task {
    comments: Comment[];
    recurring: Recurring;
    user: Pick<User, 'image' | 'nickname' | 'id'>;
  }

  // tasks: string[]
}
