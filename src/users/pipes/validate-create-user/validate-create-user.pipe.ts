import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';

@Injectable()
export class ValidateCreateUserPipe implements PipeTransform {
  transform(value: CreateUserDto, metadata: ArgumentMetadata) {
    console.log('validate age')
    const parseAgeToInt = parseInt(value.age.toString())
    if (isNaN(parseAgeToInt)) {
      console.log(`${value.age} is not a number`)
      throw new HttpException('Invalid Data type for property age. Expected Number', HttpStatus.BAD_REQUEST)
    }
    console.log(`Nice, ${parseAgeToInt} is a number`)
    return { ...value, age: parseAgeToInt }
  }
}
