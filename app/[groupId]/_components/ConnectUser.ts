'use client';

import emitConnect from '@/app/api/pusher/connect/emit';
import usePusherStore from '@/lib/store';
import { useEffect } from 'react';

type ConnectUserProps = {
  groupId: number;
  userId: number;
};

const ConnectUser = ({ groupId, userId }: ConnectUserProps) => {
  const { socketId, initializePusher } = usePusherStore();

  useEffect(() => {
    const unsubscribePusher = initializePusher(groupId.toString());

    // 유저 접속
    const handleConnect = async () => {
      if (socketId) {
        await emitConnect({
          action: 'userConnected',
          userId,
          roomId: groupId.toString(),
          socketId,
          isOnline: true,
        });
      }
    };
    // 유저 접속 해제
    const handleDisconnect = async () => {
      if (socketId) {
        await emitConnect({
          action: 'userDisconnected',
          userId,
          roomId: groupId.toString(),
          socketId,
          isOnline: false,
        });
      }
    };
    if (socketId) {
      handleConnect();
    }
    return () => {
      handleDisconnect();
      unsubscribePusher();
    };
  }, [groupId, socketId, userId, initializePusher]);

  return null; // 이 컴포넌트는 화면에 렌더링되지 않습니다
};

export default ConnectUser;
