declare module '@ccc-types' {
  export type DisplayIndex = number; // integer($int32), minimum: 0

  export enum FrequencyType { // export type FrequencyType = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'ONCE';
    DAILY = 'DAILY',
    WEEKLY = 'WEEKLY',
    MONTHLY = 'MONTHLY',
    ONCE = 'ONCE',
  }

  export interface Task {
    recurringId: Id; // number($double)
    frequency: FrequencyType;
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
    updateAt: DateString;
    createdAt: DateString;
    name: Nickname;
    id: Id;
    tasks: string[];
  }

  interface RecurringCreateBase {
    name: string;
    description?: string | null;
    displayIndex?: number;
    frequencyType: 'MONTHLY' | 'WEEKLY' | 'DAILY' | 'ONCE';
  }

  export interface MonthlyRecurringCreateRequestBody
    extends RecurringCreateBase {
    frequencyType: 'MONTHLY';
    monthDay: number;
  }

  export interface WeeklyRecurringCreateRequestBody
    extends RecurringCreateBase {
    frequencyType: 'WEEKLY';
    weekDays: number[];
  }

  export interface DailyRecurringCreateRequestBody extends RecurringCreateBase {
    frequencyType: 'DAILY';
    frequency: 1;
  }

  export interface OnceRecurringCreateRequestBody extends RecurringCreateBase {
    frequencyType: 'ONCE';
  }

  export type TaskRecurringCreateRequestBody =
    | MonthlyRecurringCreateRequestBody
    | WeeklyRecurringCreateRequestBody
    | DailyRecurringCreateRequestBody
    | OnceRecurringCreateRequestBody;

  export interface TaskUpdateRequestBody {
    name?: string;
    description?: string;
    displayIndex?: number;
    done?: boolean;
  }
}
