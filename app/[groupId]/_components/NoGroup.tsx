'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function NoGroup() {
  const router = useRouter();

  const handleCreateTeam = () => {
    router.push('/create-team');
  };

  const handleInviteTeam = () => {
    router.push('/invitation-team');
  };
  return (
    <div className="m-auto mt-[180px] w-full max-w-[810px] items-center">
      <Image
        src="/images/nogroup.png"
        width={312}
        height={98}
        alt="소속된 그룹이 없는 경우 나오는 이미지"
        className="m-auto md:w-[520px] lg:w-[810px]"
      />
      <p className="mb-[80px] mt-[32px] text-center text-text-default md:mb-[80px] md:mt-[48px] lg:mb-[80px] lg:mt-[48px]">
        아직 소속된 팀이 없습니다.
        <br />
        팀을 생성하거나 팀에 참여해보세요.
      </p>
      <div className="flex flex-col items-center">
        <Button type="button" className="w-[186px]" onClick={handleCreateTeam}>
          팀 생성하기
        </Button>
        <Button
          type="button"
          variant="outlined"
          className="mt-[6px] w-[186px] bg-transparent lg:mt-[16px]"
          onClick={handleInviteTeam}
        >
          팀 참여하기
        </Button>
      </div>
    </div>
  );
}
