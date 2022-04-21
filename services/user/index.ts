import { RegisterDto } from '~/services/user/dtos/register.dto';
import { PatchDto } from '~/services/user/dtos/patch.dto';

interface Statistics { totalUsers: number, todayActiveUsers: number, daysAvgActiveUsers: number }

export class UserService {
  private readonly client;

  private readonly PREFIX = 'users';

  constructor(client: Client) {
    this.client = client;
  }

  public register(dto: RegisterDto) {
    return this.client.setPrefix(this.PREFIX).post('register', dto);
  }

  public getStatistics(): Promise<Statistics> {
    return this.client.setPrefix(this.PREFIX).get('statistics');
  }

  public update(uuid: string, dto: PatchDto) {
    return this.client.setPrefix(this.PREFIX).patch(uuid, dto);
  }
}
