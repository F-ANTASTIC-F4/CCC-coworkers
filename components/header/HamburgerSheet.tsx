import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import HamburgerIcon from '@/public/icons/hamburger.svg';
import Link from 'next/link';

function HamburgerSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <HamburgerIcon className="size-6" />
      </SheetTrigger>
      <SheetContent
        className="z-[9999] w-[200px] bg-background-secondary"
        side="left"
      >
        <div className="mt-6 flex flex-col gap-6">
          <Link href="/">경영관리팀</Link>
          <SheetClose asChild>
            <Link href="/boards">자유게시판</Link>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
export default HamburgerSheet;
