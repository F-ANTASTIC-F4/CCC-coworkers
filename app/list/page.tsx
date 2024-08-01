import TaskList from './_component/TaskList';

const MockDataList = {
  updatedAt: '2024-07-31T10:43:33.797Z',
  createdAt: '2024-07-31T10:43:33.797Z',
  image: 'string',
  name: 'string',
  teamId: 'string',
  id: 0,
  members: [
    {
      role: 'ADMIN',
      userImage: 'string',
      userEmail: 'string',
      userName: 'string',
      groupId: 0,
      userId: 0,
    },
  ],
  taskLists: [
    {
      groupId: 0,
      displayIndex: 0,
      updatedAt: '2024-07-31T10:43:33.797Z',
      createdAt: '2024-07-31T10:43:33.797Z',
      name: '법인 설립',
      id: 1,
      tasks: [
        {
          deletedAt: '2024-07-31T09:35:03.957Z',
          recurringId: 0,
          frequency: 'DAILY',
          userId: 0,
          date: '2024-07-31T09:35:03.957Z',
          doneAt: '2024-07-31T09:35:03.957Z',
          updatedAt: '2024-07-31T09:35:03.957Z',
          name: '등기 비용 안내드리기',
          id: 1,
        },
        {
          deletedAt: '2024-07-31T09:35:03.957Z',
          recurringId: 0,
          frequency: 'DAILY',
          userId: 0,
          date: '2024-07-31T09:35:03.957Z',
          doneAt: '2024-07-31T09:35:03.957Z',
          updatedAt: '2024-07-31T09:35:03.957Z',
          name: '사기치면 안된다!',
          id: 2,
        },
        {
          deletedAt: '2024-07-31T09:35:03.957Z',
          recurringId: 0,
          frequency: 'DAILY',
          userId: 0,
          date: '2024-07-31T09:35:03.957Z',
          doneAt: '2024-07-31T09:35:03.957Z',
          updatedAt: '2024-07-31T09:35:03.957Z',
          name: '항상 정의롭게 벌자',
          id: 3,
        },
      ],
    },
  ],
};

function ListPage() {
  return (
    <section className="mx-auto flex w-full flex-col gap-6 px-4 xl:max-w-[1232px]">
      <h1 className="mr-auto mt-6 text-[18px] font-bold text-text-primary">
        할 일
      </h1>
      <TaskList lists={MockDataList.taskLists} />
    </section>
  );
}

export default ListPage;
