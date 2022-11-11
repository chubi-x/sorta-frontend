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
interface OauthResponse extends ServerResponse {
  data: Oauth;
}
interface BookmarksResponse extends ServerResponse {
  data: Bookmarks;
}
interface Bookmarks {
  data: Bookmark[];
  meta: object;
}

interface Bookmark {
  // status: "fulfilled" | "rejected";
  // value: {
  text: string;
  id: string;
  author_id: string;
  author_name: string;
  author_pfp: string;
  author_username: string;
  author_verified: string;
  created_at: string;
  // urls: [];
  // attachments: [];
  // };
}

interface UserResponse extends ServerResponse {
  data: User;
}
interface User {
  id: string;
  name: string;
  verified: boolean;
  username: string;
  pfp: string;
  isLogged: boolean;
}

