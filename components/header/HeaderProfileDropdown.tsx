'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import DefaultUserIcon from '@/public/icons/header_user.svg';
import { User } from '@ccc-types';
import Link from 'next/link';

function HeaderProfileDropdown({ user }: { user: User }) {
  const handleLogout = () => {
    console.log('로그아웃');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center gap-2">
          <DefaultUserIcon className="size-4" />
          <p className="hidden text-sm font-medium xl:block">{user.nickname}</p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-[10000] mt-5 px-6">
        <DropdownMenuItem
          asChild
          className="flex w-full justify-center py-[14px]"
        >
          <Link href="/user-history">마이 히스토리</Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          asChild
          className="flex w-full justify-center py-[14px]"
        >
          {/* TODO - 계정 설정 페이지 등록 */}
          <Link href="/">계정 설정</Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          asChild
          className="flex w-full justify-center py-[14px]"
        >
          {/* TODO - 팀 참여 페이지 등록 */}
          <Link href="/">팀 참여</Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          asChild
          className="flex w-full justify-center py-[14px]"
        >
          <button type="button" onClick={handleLogout}>
            로그아웃
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default HeaderProfileDropdown;
