import { Injectable } from '@nestjs/common';
import { CreateUserType } from 'src/utils/types';

@Injectable()
export class UsersService {
  private fakeUsers: CreateUserType[] = [
    { username: 'hehe', email: 'hehe' },
    { username: 'hehe1', email: 'hehe1' }
  ]

  fetchUsers() {
    return this.fakeUsers
  }

  createUser(userDetails: CreateUserType) {
    this.fakeUsers.push(userDetails)
    return
  }

  fetchUserById(id: number) {
    return { id: 1, username: 'fake id', email: 'fake email' }
  }
}
