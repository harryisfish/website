export interface Blog {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  content: string;
  urlname: string;
  categories: string[];
  tags: string[];
  hide: boolean;
  digest?: string;
  status?: string;
}
