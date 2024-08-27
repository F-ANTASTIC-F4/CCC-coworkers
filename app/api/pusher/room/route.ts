/* eslint-disable import/prefer-default-export */
import { db } from '@/lib/db';

export async function GET() {
  const createdRoom = await db.chatRoom.create({
    data: {} as any,
  });

  return new Response(createdRoom.id);
}
