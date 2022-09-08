import { User } from '../../users/models/user.schema';

export class AuthResponse {
  user: User;
  token: string;
}
