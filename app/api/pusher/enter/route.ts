/* eslint-disable import/prefer-default-export */
import { pusherServer } from '@/lib/pusher';

export const POST = async (req: Request) => {
  const { member, roomId, socketId } = await req.json();
  await pusherServer.trigger(roomId, 'enter', `${member}님이 접속했습니다.`, {
    socket_id: socketId,
  });

  return new Response(JSON.stringify({ success: true }));
};
