'use server';

import { Client, HttpClientConfig } from '@/lib/api/HttpClient';
import FetchError from '@/lib/api/HttpClient/FetchError';
import { cookies, headers } from 'next/headers';

/* eslint-disable prefer-template */

const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_APP_BASE_URL || ''
    : 'http://localhost:3000';

const clientInstance = new Client({
  baseURL: BASE_URL + process.env.NEXT_PUBLIC_PROXY_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 5000,
  withCredentials: true,
});

clientInstance.interceptors.request.use((config) => {
  const requestConfig = config;
  const cookieStore = cookies();
  const decodedCookie = decodeURIComponent(cookieStore.toString());

  const headersList = headers();
  requestConfig.baseURL =
    headersList.get('x-forwarded-proto') +
    '://' +
    headersList.get('x-forwarded-host') +
    process.env.NEXT_PUBLIC_PROXY_URL;

  requestConfig.headers.Cookie = decodedCookie || '';

  return requestConfig;
});

const client = async <T = unknown>(url: string, options: HttpClientConfig) => {
  try {
    const response: T = await clientInstance.request(url, options);
    return { data: response };
  } catch (error: any) {
    return {
      error: error as FetchError,
    };
  }
};

export default client;
