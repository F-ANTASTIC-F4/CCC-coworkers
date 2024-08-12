import { Member } from '@ccc-types';
import Link from 'next/link';

import MemberCard from './MemberCard';

function TeamMember({ members }: { members: Member[] }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex gap-x-2">
          <p className="font-medium">멤버</p>
          <p className="text-text-default">({members.length}개)</p>
        </div>
        <Link href="/" className="text-sm text-brand-primary">
          + 새로운 멤버 추가하기
        </Link>
      </div>
      <div className="my-6 grid grid-cols-2 grid-rows-2 gap-6 md:grid-cols-3">
        {members.map((member) => (
          <MemberCard key={member.userId} member={member} />
        ))}
      </div>
    </div>
  );
}
export default TeamMember;
