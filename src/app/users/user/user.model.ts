export class User {
  id: number;
  avatar: string;
  balance: number;
  fname: string;
  mname: string;
  name: string;
  lastUpdatedAt: string;
  status: UserStatus;
}

export type UserStatus = 0 | 1 | 2;
