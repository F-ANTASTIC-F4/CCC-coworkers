'use client';

import Modal from '@/components/modal/Modal';
import useOnOff from '@/hooks/useOnOff';
import React from 'react';

function ClientComponent() {
  const { state: modalState, setOn, setOff } = useOnOff();

  return (
    <div>
      <button type="button" onClick={setOn}>
        모달
      </button>
      <Modal setOpen={modalState} setClose={setOff} isCloseIcon>
        <h1 className="text-[30px]">할 일 추가</h1>
        <input
          type="text"
          placeholder="할일을 입력하세요"
          className="h-[40px] w-full pl-3"
        />
        <button className="h-[20px] w-full" type="button">
          확인
        </button>
      </Modal>
    </div>
  );
}

export default ClientComponent;
