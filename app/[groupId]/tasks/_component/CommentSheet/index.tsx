'use client';

import TaskEditDeleteDropdown from '@/components/dropdown-template/TaskEditDeleteDropdown';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import fetchAPI from '@/lib/api/fetchAPI';
import { deleteTask, updateTask } from '@/lib/api/task';
import CheckIcon from '@/public/icons/button/check_icon.svg';
import NoCommentIcon from '@/public/icons/no_comment_icon.svg';
import { Comment, DetailTask, Id } from '@ccc-types';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import CommentMeta from './CommentMeta';

interface FormData {
  name?: string;
  description?: string;
  done: boolean;
}

export default function CommentSheet({
  children,
  isDone,
  task,
  handleClick,
}: {
  children: React.ReactNode;
  isDone: boolean;
  task: DetailTask;
  handleClick: (value: boolean) => void;
}) {
  const [commentList, setCommentList] = React.useState<Comment[] | null>(null);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [isDeleting, setIsDeleting] = React.useState<boolean>(false);
  const [formData, setFormData] = React.useState<FormData>({
    done: isDone,
  });
  const router = useRouter();

  const fetchData = async (idValue: Id) => {
    const res = await fetchAPI.Comments(idValue);
    if (res.error) {
      console.error(res.error);
    } else {
      setCommentList(res.data);
    }
  };

  const handleTaskToggle = async () => {
    const newFormData = {
      ...formData,
      done: !isDone,
    };
    setFormData(newFormData);
    handleClick(!isDone);
    try {
      await updateTask(task.id, newFormData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteClick = async () => {
    setIsOpen(false);
    setIsDeleting(true);
    try {
      await deleteTask(task.id);
      router.refresh();
    } catch (e) {
      alert('할 일 삭제에 실패하였습니다.');
    }
  };

  // const handleCommentList = (value: Comment) => {
  //   if (commentList) {
  //     setCommentList((prev) => [value, ...(prev || [])]);
  //   }
  // };

  useEffect(() => {
    if (isOpen && task.id) {
      fetchData(task.id);
    }
  }, [isOpen, task.id]);

  return (
    <Sheet onOpenChange={setIsOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        className={`mt-[60px] w-full ${isDeleting && 'opacity-70'} md:max-w-[435px] xl:max-w-[778px]`}
      >
        {isDeleting && (
          <p className="text-sm font-bold text-status-danger">삭제중...</p>
        )}
        {isDone && (
          <div className="flex items-center gap-[6px] text-brand-tertiary">
            <CheckIcon />
            <p>완료</p>
          </div>
        )}
        <SheetTitle className="flex items-center justify-between">
          <p className={isDone ? 'line-through' : ''}>{task.name}</p>
          <TaskEditDeleteDropdown
            title={task.name}
            taskId={task.id}
            className="h-[24px] w-[24px]"
            onClick={handleDeleteClick}
          />
        </SheetTitle>
        <CommentMeta task={task} />
        <SheetDescription className="relative mt-2 min-h-[150px]">
          {task.description}
          <Button
            variant={isDone ? 'floating-outlined' : 'floating'}
            className="absolute bottom-0 right-0"
            onClick={handleTaskToggle}
          >
            <CheckIcon className="stroke-brand-primary" />
            &nbsp;{isDone ? '완료 취소하기' : '완료하기'}
          </Button>
        </SheetDescription>
        <CommentForm id={task.id} />
        {commentList?.length !== 0 ? (
          <div className="custom-scroll mt-[-20px] h-full w-full overflow-scroll pb-[40px]">
            {commentList?.map((comment) => (
              <CommentItem key={comment.id} {...comment} />
            ))}
          </div>
        ) : (
          <div className="mb-[60px] flex h-full flex-col items-center justify-center gap-3">
            <NoCommentIcon
              width={96}
              height={96}
              className="fill-brand-primary"
            />
            <p>아직 작성된 댓글이 없습니다.</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
