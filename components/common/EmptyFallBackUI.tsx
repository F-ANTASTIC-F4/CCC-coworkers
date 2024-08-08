import Image from 'next/image';

const EmptyFallBackUI = () => {
  return (
    <div>
      <Image
        src="/public/images/empty_group.png"
        alt="데이터가 없어요"
        width="810"
        height="255"
      />
    </div>
  );
};

export default EmptyFallBackUI;
