import fetchAPI from '@/lib/api/fetchAPI';

import ConnectUser from './_components/ConnectUser';
import TeamMember from './_components/TeamMember';
import TeamReport from './_components/TeamReport';
import TeamTitle from './_components/TeamTitle';
import TeamToDoList from './_components/TeamToDoList';

async function TeamPage({ params }: { params: { groupId: number } }) {
  const { data, error } = await fetchAPI.Group(params.groupId);
  const { data: userData } = await fetchAPI.User();
  // TODO: 에러 처리 추가
  if (error || !data) {
    return <div>{error.info}</div>;
  }
  if (!userData) {
    return <div>유저 정보가 없습니다.</div>;
  }
  const { taskLists = [], members = [] } = data || {};

  return (
    <div>
      <TeamTitle groupData={data} />
      <ConnectUser groupId={params.groupId} userId={userData.id} />
      {/* REVIEW - groupId params vs useParams (프롭 드릴링 때문) */}
      <TeamToDoList taskLists={taskLists} groupId={params.groupId} />
      <TeamReport taskLists={taskLists} />
      <TeamMember members={members} groupId={params.groupId} />
    </div>
  );
}
export default TeamPage;
