export interface Post {
  id: string;
  category: string;
  content: string;
  location: string;
  posted_time: Date;
  author: string;
}

export interface ViewPost {
  id: string;
  category: string;
  content: string;
  location: string;
  posted_date: Date;
  author: string;
  author_name: string;
  images: any[];
}
