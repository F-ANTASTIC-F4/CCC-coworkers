import fetchAPI from '@/lib/api/fetchAPI';

import HistoryList from './_components/HistoryList';

async function HistoryPage() {
  let listData;
  const res = await fetchAPI.UserHistory();
  if (res.error) {
    console.log(res.error);
  } else {
    const list = res.data;
    listData = list;
  }
  return (
    <section
      className={`center mx-auto w-full ${listData && listData.length !== 0 ? '' : 'min-screen'} max-w-[1232px] flex-col gap-6 px-4`}
    >
      <h1 className="mr-auto mt-5 text-[20px] font-bold">마이 히스토리</h1>
      {listData && listData.length !== 0 ? (
        listData.map((task) => <HistoryList tasksDone={task.tasksDone} />)
      ) : (
        <div className="flex h-full items-center">
          <p className="text-[14.8px] font-medium text-text-default">
            아직 히스토리가 없습니다.
          </p>
        </div>
      )}
    </section>
  );
}

export default HistoryPage;
