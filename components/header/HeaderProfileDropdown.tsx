'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import DefaultUserIcon from '@/public/icons/header_user.svg';
import { User } from '@ccc-types';
import Image from 'next/image';
import Link from 'next/link';

import LogoutModal from '../modal-template/LogoutModal';

function HeaderProfileDropdown({ user }: { user: User }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center gap-3">
          {user.image ? (
            <div className="relative size-5 rounded-xl">
              <Image
                src={user.image}
                alt="유저 프로필 이미지"
                fill
                className="rounded-xl"
                style={{ objectFit: 'cover' }}
              />
            </div>
          ) : (
            <DefaultUserIcon className="size-5" />
          )}
          <p className="hidden text-sm font-medium xl:block">{user.nickname}</p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="relative z-dropdown mt-5 w-full max-xl:right-5">
        <DropdownMenuItem
          asChild
          className="flex w-full cursor-pointer justify-center py-[14px]"
        >
          <Link href="/user-history" className="w-full">
            마이 히스토리
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          asChild
          className="flex w-full cursor-pointer justify-center py-[14px]"
        >
          <Link href="/my-account">계정 설정</Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          asChild
          className="flex w-full cursor-pointer justify-center py-[14px]"
        >
          {/* TODO - 팀 참여 페이지 등록 */}
          <Link href="/invitation-team">팀 참여</Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          asChild
          className="flex w-full cursor-pointer justify-center py-[14px]"
        >
          <LogoutModal>
            <button type="button">로그아웃</button>
          </LogoutModal>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default HeaderProfileDropdown;
