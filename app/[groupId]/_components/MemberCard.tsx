'use client';

import { pusherClient } from '@/lib/pusher';
import { cn } from '@/lib/utils';
import DefaultProfile from '@/public/icons/default_profile.svg';
import StateBullet from '@/public/icons/state_bullet.svg';
import { Member } from '@ccc-types';
import { useEffect, useState } from 'react';

function MemberCard({
  member,
  className,
  initialOnlineState,
}: {
  member: Member;
  className?: string;
  initialOnlineState: boolean;
}) {
  const [userOnlineState, setUserOnlineState] = useState(initialOnlineState);
  useEffect(() => {
    const handleUserStatus = ({
      userId,
      isOnline,
    }: {
      userId: number;
      isOnline: boolean;
    }) => {
      if (userId === member.userId) {
        setUserOnlineState(isOnline);
        console.log(
          `userId: ${userId} / member.userId ${member.userId} isOnline : ${isOnline}`
        );
      }
    };

    pusherClient.bind('user-connected', handleUserStatus);
    pusherClient.bind('user-disconnected', handleUserStatus);
    return () => {
      pusherClient.unbind('user-connected', handleUserStatus);
      pusherClient.unbind('user-disconnected', handleUserStatus);
    };
  }, [member]);
  return (
    <div
      className={cn(
        'flex h-[68px] flex-col gap-y-[6px] rounded-2xl bg-background-secondary px-4 py-3 md:h-[73px] md:px-6 md:py-5',
        className
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex gap-2">
          <DefaultProfile className="size-6 md:size-8" />
          <div className="flex flex-col">
            <p className="text-sm font-medium">{member.userName}</p>
            <p className="hidden truncate text-xs text-text-secondary md:block">
              {member.userEmail}
            </p>
          </div>
        </div>
        <StateBullet fill={userOnlineState ? '#10B981' : '#7c838e'} />
      </div>
      <p className="truncate text-xs text-text-secondary md:hidden">
        {member.userEmail}
      </p>
    </div>
  );
}
export default MemberCard;
