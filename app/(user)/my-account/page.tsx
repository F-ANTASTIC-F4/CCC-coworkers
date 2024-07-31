import WithDrawalModal from '@/components/modal-template/WithDrawalModal';
import fetchAPI from '@/lib/api/fetchAPI';
import { deleteUser } from '@/lib/api/user';

import AccountEditForm from './AccountEditForm';

const Page = async () => {
  const currentUserAccountInfo = await fetchAPI.User();

  return (
    <div className="center mx-auto w-full max-w-[792px] flex-col gap-6 px-4">
      <h1 className="mr-auto mt-12 text-[20px] font-bold xl:mt-[140px]">
        계정 정보
      </h1>
      <AccountEditForm currentUserAccountInfo={currentUserAccountInfo} />
      <div className="ml-auto">
        <WithDrawalModal onClick={deleteUser} />
      </div>
    </div>
  );
};

export default Page;
