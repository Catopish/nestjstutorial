import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { user } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class UsersRepository extends Repository<user> {
  constructor(private datasource: DataSource) {
    super(user, datasource.createEntityManager());
  }

  async createUser(authcredentialsDTO: AuthCredentialsDto): Promise<void> {
    const { username, password } = authcredentialsDTO;

    const user = this.create({
      username,
      password,
    });

    await this.save(user);
  }
}
