import {
  LandingCard,
  LandingContainer,
} from '@/components/landing/LandingCard';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import FirstLandingCardIcon from '@/public/icons/landing_card_first_icon.svg';
import SecondLandingCardIcon from '@/public/icons/landing_card_second_icon.svg';
import ThirdLandingCardIcon from '@/public/icons/landing_card_third_icon.svg';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      {/* NOTE - 100vh - 헤더 높이 */}
      <section className="flex h-[calc(100vh-60px)] flex-col items-center bg-[url('/images/landing_small.png')] bg-cover bg-center bg-no-repeat md:bg-[url('/images/landing_medium.png')] xl:bg-[url('/images/landing_large.png')]">
        <div className="flex w-full flex-col items-center justify-center pt-[55px] font-semibold md:pt-[100px]">
          <h1 className="mb-1 text-2xl md:mb-2 md:text-[40px] xl:mb-5 xl:text-5xl">
            함께 만들어가는 투두 리스트 🛠️
          </h1>
          <h1 className="inline-block bg-gradient-to-r from-[#10B981] to-[#CEF57E] bg-clip-text text-[32px] text-transparent md:text-5xl xl:text-[64px]">
            Coworkers
          </h1>
        </div>
        {/* TODO - 공통 컴포넌트 버튼 추가 */}
        <Button className="absolute bottom-12 md:bottom-[120px]">
          버튼 예제
        </Button>
      </section>
      <section className="space-y-6 px-4 md:px-6 xl:mx-auto xl:w-[1000px] xl:space-y-20 xl:px-0">
        <LandingCard>
          <LandingContainer>
            {/* NOTE - 부모의 패딩 값만큼 right를 이동시켜야 합니다 */}
            <div className="absolute top-12 flex flex-col gap-y-4 md:right-40 md:top-1/2 md:-translate-y-1/2 md:justify-center xl:right-[174px]">
              <div className="flex size-12 items-center justify-center rounded-xl border bg-background-secondary">
                <FirstLandingCardIcon />
              </div>
              <Label className="text-lg font-medium">
                그룹으로
                <br /> 할 일을 관리해요
              </Label>
            </div>
            <div className="absolute bottom-0 h-[273px] w-[235px] xl:h-[338px] xl:w-[291px]">
              <Image
                src="/images/landing_card_first.png"
                alt="first landing card"
                fill
                sizes="(min-width: 768px) 291px, 235px"
                className="object-contain"
              />
            </div>
          </LandingContainer>
        </LandingCard>
        <LandingCard className="bg-background-secondary">
          <LandingContainer>
            <div className="absolute bottom-12 flex flex-col gap-y-4 md:top-1/2 md:-translate-y-1/2 md:justify-center">
              <div className="flex size-12 items-center justify-center rounded-xl border bg-background-secondary">
                <SecondLandingCardIcon />
              </div>
              <Label className="text-lg font-medium">
                간단하게 멤버들을
                <br /> 초대해요
              </Label>
            </div>
            <div className="absolute top-0 h-[273px] w-[235px] md:right-40 xl:right-[174px] xl:h-[338px] xl:w-[291px]">
              <Image
                src="/images/landing_card_second.png"
                alt="second landing card"
                fill
                sizes="(min-width: 768px) 291px, 235px"
                className="object-contain"
              />
            </div>
          </LandingContainer>
        </LandingCard>
        {/* TODO - 화이트 모드 색상 고려할 것 */}
        <LandingCard className="bg-[#020617]">
          <LandingContainer>
            <div className="absolute bottom-12 flex flex-col gap-y-4 md:right-40 md:top-1/2 md:-translate-y-1/2 md:justify-center xl:right-[174px]">
              <div className="flex size-12 items-center justify-center rounded-xl border bg-background-secondary">
                <ThirdLandingCardIcon />
              </div>
              <Label className="text-lg font-medium">
                할 일도 간편하게
                <br /> 체크해요
              </Label>
            </div>
            <div className="absolute top-0 h-[273px] w-[235px] xl:h-[338px] xl:w-[291px]">
              <Image
                src="/images/landing_card_third.png"
                alt="third landing card"
                fill
                sizes="(min-width: 768px) 291px, 235px"
                className="object-contain"
              />
            </div>
          </LandingContainer>
        </LandingCard>
      </section>
      <section className="h-screen bg-[url('/images/landing_bottom_small.png')] bg-cover bg-center bg-no-repeat md:bg-[url('/images/landing_bottom_medium.png')] xl:bg-[url('/images/landing_bottom_large.png')]">
        <div className="flex flex-col items-center justify-center pt-[123px] text-center md:pt-[176px] xl:pt-[230px]">
          <h1 className="mb-4 text-2xl font-semibold md:mb-6 md:text-[40px]">
            지금 바로 시작해보세요
          </h1>
          <p className="text-base font-medium md:text-2xl">
            팀원 모두와 같은 방향,
            <br className="md:hidden" /> 같은 속도로 나아가는 가장 쉬운 방법
          </p>
        </div>
      </section>
    </>
  );
}
