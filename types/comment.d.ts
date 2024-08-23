declare module '@ccc-types' {
  export interface Comment {
    user: Pick<User, 'id' | 'image' | 'nickname'>;
    userId: Id;
    taskId: Id;
    updatedAt: DateString;
    createdAt: DateString;
    content: string;
    id: Id;
  }
}
