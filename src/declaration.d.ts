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
interface User {
  id: string;
  name: string;
  verified: boolean;
  username: string;
  pfp: string;
  isLogged: boolean;
}
interface Bookmarks {
  data: Bookmark[];
  meta: object;
}

interface Bookmark {
  text: string;
  id: string;
  author_id: string;
  author_name: string;
  author_pfp: string;
  author_username: string;
  author_verified: string;
  created_at: string;
  entities: {
    urls: TweetEntityUrl[];
  };
}
interface Category {
  id: string;
  name: string;
  description: string;
  image?: string;
  bookmarks: Bookmark[];
}

interface TweetEntityUrl {
  start: number;
  end: number;
  url: string;
  expanded_url: string;
  display_url: string;
  unwound_url: string;
  title?: string;
  description?: string;
  status?: string;
  images: TweetEntityUrlImage[];
}
interface TweetEntityUrlImage {
  url: string;
  width: number;
  height: number;
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
interface UserResponse extends ServerResponse {
  data: User;
}

interface OauthResponse extends ServerResponse {
  data: Oauth;
}
interface BookmarksResponse extends ServerResponse {
  data: Bookmarks;
}
interface CategoryResponse extends ServerResponse {
  data: Category;
}
interface CategoriesResponse extends ServerResponse {
  data: Category[];
}
