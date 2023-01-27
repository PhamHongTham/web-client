export interface postOptions {
  id: number;
  _id: string;
  title: string;
  description: string;
  content: string;
  status: string;
  tags: string[];
  userId: number;
  likes: number;
  comments: string;
  cover: string;
  recommend: boolean;
  deletedAt: string;
  createdAt: string;
  updatedAt: string;
  user: {
    _id: number;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    gender: string;
    dob: string;
    displayName: string;
    picture: string;
    isActive: boolean;
    isAdmin: boolean;
    followers: number;
    followings: number;
    verifyAt: string;
    createdAt: string;
    updatedAt: string;
  };
}
