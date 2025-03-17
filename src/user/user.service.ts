import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  findOneById(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  findOneByUsername(username: string): Promise<User> {
    return this.userRepository.findOneBy({ username });
  }

  async create(username: string, email: string): Promise<User> {
    const user = this.userRepository.create({ username, email })
    return this.userRepository.save(user);
  }

  async update(id: number, username: string, email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);

    user.username = username;
    user.email = email;
    return this.userRepository.save(user);
  }

  async delete(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0)
      throw new NotFoundException(`User with ID ${id} not found`);
  }
}
