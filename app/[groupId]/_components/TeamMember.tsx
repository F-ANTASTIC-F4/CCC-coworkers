import InviteMemberModal from '@/components/modal-template/InviteMemberModal';
import { db } from '@/lib/db';
import { Member } from '@ccc-types';

import MemberCard from './MemberCard';

async function TeamMember({
  members,
  groupId,
}: {
  members: Member[];
  groupId: number;
}) {
  // DB 데이터 가져옴
  const dbMembers = await db.member.findMany({
    where: {
      groupId: groupId.toString(),
    },
  });
  // 온라인 상태인 멤버들 가져오기
  const onlineMembers = dbMembers
    .filter((member) => member.isOnline)
    .map((member) => member.id);
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex gap-x-2">
          <p className="font-medium">멤버</p>
          <p className="text-text-default">({members.length}개)</p>
        </div>
        <InviteMemberModal groupId={groupId} />
      </div>
      <div className="my-6 grid grid-cols-2 grid-rows-2 gap-6 md:grid-cols-3">
        {members.map((member) => (
          <MemberCard
            key={member.userId}
            member={member}
            initialOnlineState={onlineMembers.includes(member.userId)} // 온라인 상태 전달
          />
        ))}
      </div>
    </div>
  );
}

export default TeamMember;
