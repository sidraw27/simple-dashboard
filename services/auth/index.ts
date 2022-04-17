import { LoginDto } from '~/services/auth/dtos';
import { AuthStore, useAuthStore } from '~/stores/auth';

export class AuthService {
  private readonly client;

  private readonly prefix = '/auth';

  constructor(client: Client) {
    this.client = client;
  }

  public async login(dto: LoginDto) {
    const authStore = useAuthStore() as unknown as AuthStore;

    await this.client.post(`${this.prefix}/login`, dto);
    const accessToken = await this.reAuth();
    authStore.login(accessToken);
  }

  public async logout() {
    const authStore = useAuthStore() as unknown as AuthStore;

    await this.client.post(`${this.prefix}/logout`);
    authStore.logout();
  }

  public async reAuth() {
    const { accessToken } = await this.client.post<{ accessToken: string }>(this.prefix);

    return accessToken;
  }
}
