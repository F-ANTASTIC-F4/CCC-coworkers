'use client';

import { loginWithOAuth } from '@/lib/api/auth';
import { generateRandomState } from '@/lib/utils';
import { SignInWithOAuthRequestBody } from '@ccc-types';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Loading = dynamic(() => import('@/components/common/loading'), {
  ssr: false,
});

export default function GoogleRedirect() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  // google token 가져오기
  const getGoogleToken = async (code: string): Promise<string> => {
    const url = 'https://oauth2.googleapis.com/token';

    const bodyData = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
      client_secret: process.env.NEXT_PUBLIC_GOOGLE_SECRET_KEY || '',
      redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI || '',
      code,
    });

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
        body: bodyData,
      });

      const data = await res.json();
      return data.id_token;
    } catch (e) {
      console.error('Error in getgoogleToken:', e);
      throw e;
    }
  };
  useEffect(() => {
    const handleGoogleRedirect = async () => {
      if (typeof window === 'undefined') return;

      // google 인가 code 추출
      const url = new URL(window.location.href);
      const code = url.searchParams.get('code');
      const state = generateRandomState();

      // 발급받은 인가 코드로 토큰 발급
      if (code) {
        const token = await getGoogleToken(code);
        const data: SignInWithOAuthRequestBody = {
          state,
          token,
          redirectUri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI || '',
        };
        const res = await loginWithOAuth('GOOGLE', data);
        if (res) {
          setIsLoading(false);
          router.push('/');
        }
      } else {
        setIsLoading(false);
      }
    };

    handleGoogleRedirect();
  }, [router]);

  if (isLoading) {
    return <Loading />;
  }

  return null;
}
