import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(private UsersRepository: UsersRepository) {}

  async signUp(authCredentialsDTO: AuthCredentialsDto): Promise<void> {
    return this.UsersRepository.createUser(authCredentialsDTO);
  }
}
