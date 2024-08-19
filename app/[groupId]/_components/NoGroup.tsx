import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function NoGroup() {
  return (
    <div className="w-full max-w-[810px]">
      <Image
        src="/images/nogroup.png"
        width={810}
        height={255}
        alt="소속된 그룹이 없는 경우 나오는 이미지"
      />
      <p>
        아직 소속된 팀이 없습니다.
        <br />
        팀을 생성하거나 팀에 참여해보세요.
      </p>
      <Button type="button">팀 생성하기</Button>
      <Button type="button" variant="outlined">
        팀 참여하기
      </Button>
    </div>
  );
}
