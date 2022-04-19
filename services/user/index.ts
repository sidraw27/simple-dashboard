import { RegisterDto } from '~/services/user/dtos/register.dto';

export class UserService {
  private readonly client;

  private readonly PREFIX = 'users';

  constructor(client: Client) {
    this.client = client;
  }

  public register(dto: RegisterDto) {
    return this.client.setPrefix(this.PREFIX).post('register', dto);
  }
}
