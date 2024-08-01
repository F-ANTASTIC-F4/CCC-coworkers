import TeamReport from './_components/TeamReport';
import TeamTitle from './_components/TeamTitle';
import TeamToDoList from './_components/TeamToDoList';

function TeamPage({ params }: { params: { teamId: string } }) {
  return (
    <div>
      <TeamTitle />
      <TeamToDoList />
      <TeamReport />
      {params.teamId} 페이지입니다.
    </div>
  );
}
export default TeamPage;
