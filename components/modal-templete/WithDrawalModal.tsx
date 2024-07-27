import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import WarningIcon from '@/public/icons/modal/warning_icon.svg';
import React from 'react';

function WithDrawalModal({ ...props }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="x-small">회원 탈퇴</Button>
      </DialogTrigger>
      <DialogContent>
        <WarningIcon />
        <DialogTitle>회원 탈퇴를 진행하시겠어요?</DialogTitle>
        <DialogDescription>
          그룹장으로 있는 그룹은 자동으로 삭제되고,
          <br /> 모든 그룹에서 나가집니다.
        </DialogDescription>
        <div className="gap- flex w-full max-w-[280px] gap-2">
          <DialogClose asChild>
            <Button variant="outlined-secondary">닫기</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="danger" {...props}>
              회원 탈퇴
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default WithDrawalModal;
