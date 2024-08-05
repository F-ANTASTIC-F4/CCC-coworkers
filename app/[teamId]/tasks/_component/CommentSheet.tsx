import EditDeleteDropdown from '@/components/dropdown-templete/EditDeleteDropdown';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import CheckIcon from '@/public/icons/button/check_icon.svg';
import CalenderNoBtnIcon from '@/public/icons/list/calender_no_btn.svg';
import ClockIcon from '@/public/icons/list/clock_icon.svg';
import SubmitIcon from '@/public/icons/list/comment_submit_icon.svg';
import DailyIcon from '@/public/icons/list/daily_task_icon.svg';
import { formatToDate, formatToTime } from '@/utils/dateFormat';
import { Comment } from '@ccc-types';
import Image from 'next/image';
import React, { FormEvent } from 'react';

import CommentItem from './CommentList';

const commentMockData: Comment[] = [
  {
    user: {
      teamId: 'string',
      image: 'string',
      nickname: '정성실',
      updatedAt: '2024-08-01T08:12:17.709Z',
      createdAt: '2024-08-01T08:12:17.709Z',
      encryptedPassword: 'string',
      email: 'string',
      id: 0,
    },
    userId: 0,
    taskId: 0,
    updatedAt: '2024-08-01T08:12:17.709Z',
    createdAt: '2024-08-01T08:12:17.709Z',
    content:
      '혹시 관련해서 미팅 오늘 중으로 가능하신가요?혹시 관련해서 미팅 오늘 중으로 가능하신가요?혹시 관련해서 미팅 오늘 중으로 가능하신가요?혹시 관련해서 미팅 오늘 중으로 가능하신가요?혹시 관련해서 미팅 오늘 중으로 가능하신가요?',
    id: 0,
  },
  {
    user: {
      teamId: 'string',
      image: 'string',
      nickname: '김엠지',
      updatedAt: '2024-08-02T08:12:17.709Z',
      createdAt: '2024-08-02T08:12:17.709Z',
      encryptedPassword: 'string',
      email: 'string',
      id: 1,
    },
    userId: 0,
    taskId: 0,
    updatedAt: '2024-08-02T08:12:17.709Z',
    createdAt: '2024-08-02T08:12:17.709Z',
    content: '너무 힘들어서 퇴사하겠습니다..',
    id: 1,
  },
];

const textClass = `text-xs font-normal text-text-default`;

export default function CommentSheet({
  children,
  done,
}: {
  children: React.ReactNode;
  done: boolean;
}) {
  const [isTaskDone, setIsTaskDone] = React.useState<boolean>(done);
  const [isButtonDisabled, setIsButtonDisabled] = React.useState<boolean>(true);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);

  // NOTE - 만들어주신 form을 사용하기엔 따로 에러메세지가 출력되지도 않고 그냥 글자가 있고 없고에 따라 버튼만 막아주면 될 듯하여 따로 사용하진 않았습니다!
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const handleChange = () => {
    const inputNode = inputRef.current;
    if (inputNode) {
      if (inputNode.value.length === 0) {
        setIsButtonDisabled(true);
      } else {
        setIsButtonDisabled(false);
      }
    }
  };

  const handleTaskToggle = () => {
    setIsTaskDone((prev) => !prev);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="w-full md:max-w-[435px] xl:max-w-[778px]">
        {isTaskDone && (
          <div className="flex items-center gap-[6px] text-brand-tertiary">
            <CheckIcon />
            <p>완료</p>
          </div>
        )}
        <SheetTitle className="flex items-center justify-between">
          <p className={isTaskDone ? 'line-through' : ''}>
            법인 설립 비용 안내드리기
          </p>
          <EditDeleteDropdown className="h-[24px] w-[24px]" />
        </SheetTitle>
        <div className="text-text-primar4 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative size-[32px]">
                <Image
                  src="/images/basic_profile.png"
                  alt="기본 프로필 이미지"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <span className="text-sm font-medium">안혜나</span>
            </div>
            <span className="text-sm font-normal text-text-secondary">
              {formatToDate(new Date(), 'dotFormat')}
            </span>
          </div>
          <div className="flex gap-3">
            <div className="flex items-center gap-1">
              <CalenderNoBtnIcon />
              <p className={textClass}>
                {formatToDate(new Date(), 'koreanFullDate')}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <ClockIcon />
              <p className={textClass}>{formatToTime(new Date())}</p>
            </div>
            <div className="flex items-center gap-1">
              <DailyIcon />
              <p className={textClass}>대충 할일</p>
            </div>
          </div>
        </div>
        <SheetDescription className="mt-2 min-h-[150px]">
          필수 정보 어쩌고..
        </SheetDescription>
        <form
          action="#"
          className="relative flex h-[50px] w-full items-center justify-between border-y"
          onSubmit={handleSubmit}
        >
          <textarea
            className="text max-h-full w-full resize-none bg-transparent pt-3 text-text-default outline-none"
            placeholder="댓글을 달아주세요"
            ref={inputRef}
            onChange={handleChange}
          />
          <button
            type="submit"
            aria-label="댓글 전송하기 버튼"
            className="*z-10 absolute right-0"
            disabled={isButtonDisabled}
          >
            <SubmitIcon
              className={`${isButtonDisabled ? 'text-text-default' : 'text-brand-primary'}`}
            />
          </button>
        </form>
        {commentMockData.map((commentData) => (
          <CommentItem key={commentData.id} {...commentData} />
        ))}
        <Button
          variant={isTaskDone ? 'floating-outlined' : 'floating'}
          className="absolute bottom-4 right-4"
          onClick={handleTaskToggle}
        >
          <CheckIcon className="stroke-brand-primary" />
          &nbsp;{isTaskDone ? '완료 취소하기' : '완료하기'}
        </Button>
      </SheetContent>
    </Sheet>
  );
}
