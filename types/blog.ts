export interface Blog {
  id: number;
  created_at: Date;
  updated_at: Date;
  title: string;
  content: string;
  urlname: string;
  categories: string;
  tags: string;
  hide: boolean;
}
