import { OutputData } from "@editorjs/editorjs";

export interface Blog {
  blog_id: number;
  title: string;
  content: OutputData;
  created_at: string;
}
export interface Groups {
  group_id: number;
  group_name: string;
  blogs: string;
  created_at: string;
}
export interface GroupMember {
  user_id: number;
  username: string;
  name: string;
  lastname: string;
  email: string;
  is_admin: boolean;
  is_assistant_admin: boolean;
  approved: boolean;
  created_at: string;
}

