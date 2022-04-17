import { AuthService } from '~/services/auth';

export enum Services {
  Auth
}

export function serviceFactory(client: Client, service: Services) {
  switch (service) {
    case Services.Auth:
      return new AuthService(client);
    default:
      throw new Error('Unknown client');
  }
}
