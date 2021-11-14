export interface articleOptions {
  id: number;
  title: string;
  content: string;
  tags: string[];
  status: string;
  createdAt:string;
  updatedAt:string;
  description:string;
  likes: number;
  comments: string;
  recommend: boolean;
  cover: string;
  user: {
    id: number;
    email: string;
    displayName: string;
    picture: string;
  };
}
