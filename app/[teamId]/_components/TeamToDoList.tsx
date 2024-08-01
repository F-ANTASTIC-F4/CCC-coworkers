import Link from 'next/link';

import TeamToDoListCard from './TeamToDoListCard';

function TeamToDoList() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-x-2">
          <p className="font-medium">할 일 목록</p>
          <p className="text-text-default">(4개)</p>
        </div>
        <Link href="/" className="text-sm text-brand-primary">
          + 새로운 목록 추가하기
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        <TeamToDoListCard />
        <TeamToDoListCard />
        <TeamToDoListCard />
        <TeamToDoListCard />
      </div>
    </div>
  );
}
export default TeamToDoList;
