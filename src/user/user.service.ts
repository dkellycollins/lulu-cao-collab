import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getUser(id: string): string {
    return `User ${id}`
  }
}
