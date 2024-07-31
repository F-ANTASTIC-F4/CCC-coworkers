import { Id, OAuthProvider } from '@ccc-types';
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

export const ENDPOINTS = {
  USER: {
    ACTIONS: `/user`,
    GET_HISTORY: `/user/history`,
    POST_SEND_RESET_PASSWORD_EMAIL: `/user/send-reset-password-email`,
    PATCH_RESET_PASSWORD: `/user/reset-password`,
    PATCH_PASSWORD: `/user/password`,
  },
  TASKLIST: {
    GROUP_ACTIONS: (groupId: Id, id: Id) =>
      `/groups/${groupId}/task-lists/${id}`,
    POST: (groupId: Id) => `/groups/${groupId}/task-lists`,
    PATCH_ORDER: (groupId: Id, id: Id) =>
      `/groups/${groupId}/task-lists/${id}/order`,
  },
  TASK: {
    ACTIONS_ITEM: (groupId: Id, taskListId: Id, taskId: Id) =>
      `/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`,
    ACTIONS: (groupId: Id, taskListId: Id) =>
      `/groups/${groupId}/task-lists/${taskListId}/tasks`,
    DELETE_ALL_TASKS: (groupId: Id, taskListId: Id, taskId: Id) =>
      `/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}/all`,
  },
  OAUTH: {
    POST_OAUTH_APPS: `/oauthApps`,
  },
  IMAGE: {
    POST_IMAGE_UPLOAD: `/images/upload`,
  },
  GROUP: {
    ACTIONS: (id: Id) => `/groups/${id}`,
    POST: `/groups`,
    MEMBER_ACTIONS: (id: Id, memberUserId: Id) =>
      `/groups/${id}/member/${memberUserId}`,
    MEMBER_POST: (id: Id) => `/groups/${id}/member`,
    GET_GROUP_INVITATION: (id: Id) => `/groups/${id}/invitation`,
    POST_GROUP_ACCEPT_INVITATION: `/groups/accept-invitation`,

    GET_GROUP_TASKS: (id: Id) => `/groups/${id}/tasks`,
  },
  COMMENTS: {
    ACTIONS: (taskId: Id) => `/tasks/${taskId}/comments`,
    ITEM_ACTIONS: (taskId: Id, commentId: Id) =>
      `/tasks/${taskId}/comments/${commentId}`,
  },
  AUTH: {
    POST_SIGNUP: `/auth/signUp`,
    POST_SIGNIN: `/auth/signIn`,
    POST_REFRESH_TOKEN: `/auth/refresh-token`,
    POST_SIGNIN_PROVIDER: (provider: OAuthProvider) =>
      `/auth/signIn/${provider}`,
  },
};

export const DEFAULT_TOKEN_OPTIONS: Partial<ResponseCookie> = {
  httpOnly: true,
  maxAge: 60 * 60, // 1 hour
  path: '/',
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
};
