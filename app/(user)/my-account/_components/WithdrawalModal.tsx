'use client';

import WithDrawalModal from '@/components/modal-template/WithDrawalModal';
import { deleteUser } from '@/lib/api/user';

const WithdrawalModal = () => {
  const withdrawalUser = async () => {
    const res = await deleteUser();
    if (res?.error) {
      console.error(res?.error.message);
      alert(res.error.info);
      
    }
  };

  return <WithDrawalModal onClick={withdrawalUser} />;
};

export default WithdrawalModal;
