import validateTokenAndSetAuthHeader from '@/lib/middlewares/auth.middleware';
import processTokenFromQuery from '@/lib/middlewares/reset-password.middleware';
import { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const setAuthHeaderResponse = await validateTokenAndSetAuthHeader(request);
  if (setAuthHeaderResponse) return setAuthHeaderResponse;

  const resetPasswordResponse = await processTokenFromQuery(request);
  if (resetPasswordResponse) return resetPasswordResponse;
}
