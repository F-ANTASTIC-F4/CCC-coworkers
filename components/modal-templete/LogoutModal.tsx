import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import React from 'react';

function LogoutModal({ ...props }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="x-small">로그아웃</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>로그아웃 하시겠어요?</DialogTitle>
        <div className="mt- mt-[24px] flex w-full max-w-[280px] gap-2">
          <DialogClose asChild>
            <Button variant="outlined-secondary">닫기</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="danger" {...props}>
              로그아웃
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default LogoutModal;
