import { AuthService } from '~/services/auth';
import { UserService } from '~/services/user';

export enum Services {
  Auth,
  User
}

export function serviceFactory(client: Client, service: Services) {
  switch (service) {
    case Services.Auth:
      return new AuthService(client);
    case Services.User:
      return new UserService(client);
    default:
      throw new Error('Unknown service');
  }
}
