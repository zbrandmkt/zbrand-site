export type PostStatus = 'draft' | 'pending_approval' | 'approved' | 'rejected' | 'published';
export type PostPlatform = 'instagram' | 'facebook' | 'tiktok';
export type PostType = 'reel' | 'post' | 'story' | 'carousel';
export type CommentRole = 'admin' | 'client';

export interface PostRow {
  id: string;
  client_id: string;
  created_by: string;
  title: string;
  caption: string;
  hashtags: string;
  post_type: PostType;
  platforms: PostPlatform[];
  media_urls: string[];
  scheduled_at: string | null;
  status: PostStatus;
  rejection_reason: string | null;
  approved_at: string | null;
  approved_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface PostComment {
  id: string;
  post_id: string;
  user_id: string;
  role: CommentRole;
  body: string;
  created_at: string;
}

export interface PostWithComments extends PostRow {
  post_comments: PostComment[];
}
