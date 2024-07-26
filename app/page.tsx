import { Button } from '@/components/ui/button';

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
      <section className="">
        <h1>middle</h1>
      </section>
      <section className="h-screen bg-[url('/images/landing_bottom_small.png')] bg-cover bg-center bg-no-repeat md:bg-[url('/images/landing_bottom_medium.png')] xl:bg-[url('/images/landing_bottom_large.png')]">
        <div className="flex flex-col items-center justify-center pt-[123px] text-center md:pt-[176px] xl:pt-[230px]">
          <h1 className="mb-4 text-2xl font-semibold md:mb-6 md:text-[40px]">
            지금 바로 시작해보세요
          </h1>
          <p className="text-base font-medium md:text-2xl">
            팀원 모두와 같은 방향, 같은 속도로 나아가는 가장 쉬운 방법
          </p>
        </div>
      </section>
    </>
  );
}
