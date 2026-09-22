export interface Post {
  id: number;
  content: string;
  created: number;
}

export interface PostResponse {
  post: Post;
}