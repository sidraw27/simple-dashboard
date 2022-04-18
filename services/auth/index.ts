import { LoginDto } from '~/services/auth/dtos';
import { AuthStore, useAuthStore } from '~/stores/auth';

export class AuthService {
  private readonly client;

  private readonly PREFIX = 'auth';

  constructor(client: Client) {
    this.client = client;
  }

  public async login(dto: LoginDto) {
    const authStore = useAuthStore() as unknown as AuthStore;

    await this.client.setPrefix(this.PREFIX).post('login', dto);
    const accessToken = await this.reAuth();

    authStore.login(accessToken);
  }

  public async logout() {
    const authStore = useAuthStore() as unknown as AuthStore;

    await this.client.setPrefix(this.PREFIX).post('logout');

    authStore.logout();
  }

  public async reAuth() {
    const { accessToken } = await this.client.setPrefix(this.PREFIX).post<{ accessToken: string }>('');

    return accessToken;
  }
}
