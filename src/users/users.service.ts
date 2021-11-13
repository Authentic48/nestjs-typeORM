import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.usersRepository.create({ name: 'Thomas', age: 10 });

    return this.usersRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    const users = await this.usersRepository.find();
    return users;
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOneOrFail(id);
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOneOrFail(id);

    user.name = UpdateUserDto.name;
    return user;
  }

  async remove(id: number) {
    const user = await this.usersRepository.findOneOrFail(id);

    return this.usersRepository.remove(user);
  }
}
