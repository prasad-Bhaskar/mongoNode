export interface IUser {
  name: string;
  email: string;
  image?: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  deleted?: boolean;
  deletedAt?: Date;
}
