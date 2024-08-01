declare module '@ccc-types' {
  export type DisplayIndex = number; // integer($int32), minimum: 0

  export enum FrequencyType { // export type FrequencyType = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'ONCE';
    DAILY = 'DAILY',
    WEEKLY = 'WEEKLY',
    MONTHLY = 'MONTHLY',
    ONCE = 'ONCE',
  }

  export interface Task {
    deletedAt: DateString;
    recurringId: Id; // number($double)
    frequency: FrequencyType | string;
    userId: Id; // number($double)
    date: DateString;
    doneAt?: DateString | null; // nullable: true
    description?: string; // NOTE 스웨거문서 미완성으로 인한..
    updatedAt: DateString;
    name: string;
    id: Id; // number($double)
  }

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
}
