import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { AuthGuard } from 'src/users/guards/auth/auth.guard';
import { ValidateCreateUserPipe } from 'src/users/pipes/validate-create-user/validate-create-user.pipe';
import { UsersService } from 'src/users/services/users/users.service';
import { CreateUserType } from 'src/utils/types';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {

  constructor(private userService: UsersService) {

  }

  // @Get()
  // getUsers(@Query('sortDesc', ParseBoolPipe) sortBy: boolean) {
  //   console.log(sortBy)
  //   return [{ username: 'hehe', email: 'hehe' }]
  // }

  @Get()
  getUsers() {
    return this.userService.fetchUsers()
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createUser(@Body(ValidateCreateUserPipe) userData: CreateUserDto) {
    console.log(userData.age.toPrecision())
    return this.userService.createUser(userData as CreateUserType)
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    console.log(id)
    const user = this.userService.fetchUserById(id)
    if (!user)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST)
    return user
  }

  @Get(':id/:postId')
  getUserPostById(@Param('id') id: string, @Param('postId') postId: string) {
    console.log(id, postId)
    return { id, postId }
  }
}


