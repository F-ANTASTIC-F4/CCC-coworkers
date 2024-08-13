'use client';

import { LazyLottie } from '@/components/common/LazyLottie';

import lottieJson from '../public/animation/error.json';

const Page = () => (
  <div className="center h-[calc(100vh-100px)] w-full flex-col">
    <div className="center mb-4 w-full flex-col gap-4">
      <h1 className="text-9xl font-bold">404</h1>
      <p>요청한 데이터를 찾을 수 없습니다.</p>
    </div>

    <LazyLottie
      animationData={lottieJson}
      loop
      play
      style={{ width: 300, height: 300 }}
    />
  </div>
);

export default Page;
