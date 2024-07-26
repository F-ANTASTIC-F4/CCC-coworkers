declare module '@ccc-types' {
  // ------------------ OAuth ------------------ //
  export type OAuthToken = string;
  export type AppSecret = string; // 간편 로그인을 위한 비밀 키

  export enum OAuthProvider {
    GOOGLE = 'GOOGLE',
    KAKAO = 'KAKAO',
  }

  export interface OAuthApp {
    createdAt: DateString;
    updatedAt: DateString;
    appSecret?: AppSecret | null;
    appKey: UrlType; // Google: "클라이언트 id", Kakao: "REST API 키"
    provider: OAuthProvider;
    teamId: string;
    id: Id;
  }

  export interface OAuthAppUpsertRequestBody {
    // 간편 로그인 App 등록/수정
    // Google, Kakao 간편 로그인을 위한 App 을 등록하거나 수정합니다.
    // 이미 등록된 앱이 있을 경우 덮어씌워집니다.
    appSecret?: AppSecret | null;
    appKey: UrlType; // Google: "클라이언트 id", Kakao: "REST API 키"
    provider: OAuthProvider;
  }
  // ------------------ OAuth ------------------ //

  export type SignUpRequestBody = Pick<User, 'image', 'nickname' | 'email'> &
    PasswordAuthentication;

  export type SignInRequestBody = Pick<SignUpRequestBody, 'email', 'password'>;
  export interface SignInWithOAuthRequestBody {
    state: string; // code를 얻을 때 사용하였던 state 값
    redirectUri: UrlType; // example: http://localhost:3000/OAuth/kakao
    token: OAuthToken;
  }

  export type AuthRequestBody = // NOTE 묶는게 맞을지 잘모르겠어요
    SignUpRequestBody | SignInRequestBody | SignInWithOAuthRequestBody;

  export interface AuthResponse {
    refreshToken: string;
    accessToken: string;
    user: User;
  }

  export type SendResetPasswordEmailRequestBody = {
    // 비밀번호 재설정 이메일 전송
    // {redirectUrl}/reset-password?token=${token}로 이동할 수 있는 링크를 이메일로 전송합니다.
    // e.g. "https://coworkers.vercel.app/reset-password?token=1234567890"
    email: Email;
    redirectUrl: UrlType;
  };

  type PasswordAuthentication = {
    passwordConfirmation: Password;
    password: Password;
  };

  export type ResetPasswordRequestBody = PasswordAuthentication & {
    token: string;
  };
  export type UpdatePasswordRequestBody = PasswordAuthentication;
}
