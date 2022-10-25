declare module "*.svg";
declare module "*.jpg";
declare module "*.png";

declare namespace JSX {
  interface IntrinsicElements {
    "lottie-player": any;
  }
}

interface Oauth {
  url: string;
  state: string;
  codeVerifier: string;
  codeChallenge: string;
}
interface CallbackQueryParams {
  error?: string;
  state: string;
  code?: string;
}

interface ServerResponse {
  message?: string;
  data?: object;
  success: boolean;
  error?: string;
}
interface UserResponse {
  message: string;
  data: User;
  success: boolean;
}
interface User {
  id: string;
  name: string;
  verified: boolean;
  username: string;
  pfp: string;
  isLogged: boolean;
}

