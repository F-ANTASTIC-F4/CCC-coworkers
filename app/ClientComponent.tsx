'use client';

import InviteMemberModal from '@/components/modal-templete/InviteMemberModal';
import LogoutModal from '@/components/modal-templete/LogoutModal';
import MakeTodoModal from '@/components/modal-templete/MakeTodoModal';
import ResetPasswordModal from '@/components/modal-templete/ResetPasswordModal';
import TodoListModal from '@/components/modal-templete/TodoListModal';
import WithDrawalModal from '@/components/modal-templete/WithDrawalModal';
import React from 'react';

function ClientComponent() {
  return (
    <>
      <InviteMemberModal />
      <LogoutModal />
      <MakeTodoModal />
      <ResetPasswordModal />
      <TodoListModal />
      <WithDrawalModal />
    </>
  );
}

export default ClientComponent;
