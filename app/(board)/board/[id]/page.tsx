import BoardCommentInput from '../../_components/BoardCommentInput';
import BoardComments from '../../_components/BoardComments';
import BoardDetailDescription from '../../_components/BoardDetailDescription';

function BoardDetail() {
  return (
    <div className="my-10 md:my-14">
      <BoardDetailDescription />
      <BoardCommentInput />
      <BoardComments />
    </div>
  );
}
export default BoardDetail;
