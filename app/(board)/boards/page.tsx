import BestBoards from '../_components/BestBoards';
import BoardList from '../_components/BoardList';
import SearchBoard from '../_components/SearchBoard';

function BoardPage() {
  return (
    <>
      <SearchBoard />
      <BestBoards />
      <hr className="my-8 md:my-10" />
      <BoardList />
    </>
  );
}
export default BoardPage;
