import { LoginDto } from '~/services/auth/dtos';
import { AuthStore, useAuthStore } from '~/stores/auth';
import { ValidateEmailDto } from '~/services/user/dtos/validate-email.dto';

export class AuthService {
  private readonly client;

  private readonly PREFIX = 'auth';

  constructor(client: Client) {
    this.client = client;
  }

  public async login(dto: LoginDto) {
    const authStore = useAuthStore() as unknown as AuthStore;

    await this.client.setPrefix(this.PREFIX).post('login', dto);
    await this.reAuth();

    if (!authStore.isVerify) {
      this.resendValidateEmail();
    }
  }

  public async logout() {
    const authStore = useAuthStore() as unknown as AuthStore;

    await this.client.setPrefix(this.PREFIX).post('logout');

    authStore.logout();
  }

  public async validateEmail(dto: ValidateEmailDto) {
    await this.client.setPrefix(this.PREFIX).patch<{ accessToken: string }>('validate-email', dto);
    await this.reAuth();
  }

  public resendValidateEmail() {
    return this.client.setPrefix(this.PREFIX).post('resend-validate-email');
  }

  public async reAuth(isForceRefresh = false) {
    const authStore = useAuthStore() as unknown as AuthStore;
    let payload = {};

    if (isForceRefresh) {
      payload = {
        forceRefresh: true,
      };
    }

    const { accessToken } = await this.client.setPrefix(this.PREFIX).post<{ accessToken: string }>('', payload);
    authStore.login(accessToken);
  }
}
