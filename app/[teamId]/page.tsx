import fetchAPI from '@/lib/api/fetchAPI';

import TeamMember from './_components/TeamMember';
import TeamReport from './_components/TeamReport';
import TeamTitle from './_components/TeamTitle';
import TeamToDoList from './_components/TeamToDoList';

async function TeamPage({ params }: { params: { teamId: number } }) {
  const { data } = await fetchAPI.Group(params.teamId);

  return (
    <div>
      <TeamTitle />
      <TeamToDoList taskLists={data?.taskLists ?? []} />
      <TeamReport taskLists={data?.taskLists ?? []} />
      <TeamMember members={data?.members ?? []} />
    </div>
  );
}
export default TeamPage;
