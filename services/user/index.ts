import { RegisterDto } from '~/services/user/dtos/register.dto';
import { ValidateEmailDto } from '~/services/user/dtos/validate-email.dto';
import { useAuthStore } from '~/stores/auth';

export class UserService {
  private readonly client;

  private readonly PREFIX = 'users';

  constructor(client: Client) {
    this.client = client;
  }

  public register(dto: RegisterDto) {
    return this.client.setPrefix(this.PREFIX).post('register', dto);
  }

  public async validateEmail(dto: ValidateEmailDto) {
    const { accessToken } = await this.client.patch<{ accessToken: string }>('validate-email', dto);

    const store = useAuthStore();

    store.login(accessToken);
  }
}
