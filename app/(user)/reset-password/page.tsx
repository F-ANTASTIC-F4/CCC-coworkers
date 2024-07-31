import { resetPassword } from '@/lib/api/user';

import UpdatePasswordForm from './UpdatePasswordForm';

const Page = () => (
  <div className="center mx-auto w-full max-w-[460px] flex-col gap-6 px-4">
    <h1 className="mr-auto mt-12 text-[20px] font-bold xl:mt-[140px]">
      비밀번호 재설정
    </h1>
    <UpdatePasswordForm onSubmit={resetPassword} />
  </div>
);

export default Page;
