import Image from 'next/image';
import Link from 'next/link';

import LoginForm from './_components/loginForm';

export default function Login() {
  return (
    <div className="m-auto w-full max-w-[460px]">
      <h2 className="mb-[80px] text-center text-[40px] font-medium">로그인</h2>
      <LoginForm />
      <p className="mt-[24px] text-center text-[16px] font-medium">
        아직 계정이 없으신가요?
        <Link
          href="signIn"
          className="ml-[12px] text-[16px] text-[#10B981] underline"
        >
          가입하기
        </Link>
      </p>
      <div className="relative mb-[16px] mt-[48px] text-center before:absolute before:inset-y-1/2 before:left-0 before:z-[-1] before:h-px before:w-full before:bg-[#ffffff]">
        <p className="inline-block bg-[#000000] px-[24px] text-[16px]">OR</p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-[16px] font-medium">간편 로그인하기</p>
        <div className="flex gap-3">
          <Image src="/images/google.png" alt="구글" width={42} height={42} />
          <Image
            src="/images/kakaotalk.png"
            alt="카카오"
            width={42}
            height={42}
          />
        </div>
      </div>
    </div>
  );
}
