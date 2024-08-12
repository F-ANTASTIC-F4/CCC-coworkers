import fetchAPI from '@/lib/api/fetchAPI';
import { Group } from '@ccc-types';

import TeamMember from './_components/TeamMember';
import TeamReport from './_components/TeamReport';
import TeamTitle from './_components/TeamTitle';
import TeamToDoList from './_components/TeamToDoList';

async function TeamPage({ params }: { params: { teamId: number } }) {
  const { data } = await fetchAPI.Group(params.teamId);
  const { taskLists = [], members = [] } = data || {};

  return (
    <div>
      <TeamTitle groupData={data as Group} />
      <TeamToDoList taskLists={taskLists} />
      <TeamReport taskLists={taskLists} />
      <TeamMember members={members} />
    </div>
  );
}
export default TeamPage;
