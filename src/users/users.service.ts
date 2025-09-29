import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { EntityManager, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor( 
    @InjectRepository(User) 
  private readonly usersRepository: Repository<User>,
  private readonly entityManager: EntityManager,
) {}

  
  async create(createUserDto: CreateUserDto) {
    const { password } = createUserDto;
    const hashed = await bcrypt.hash(password, 10);
    createUserDto.password = hashed;

    const user = new User(createUserDto);

    return this.entityManager.save(user);
  }

  findAll() {
    return this.usersRepository.find();
  }

  findUserById(id: number) {
    const user = this.usersRepository.findOne({where: {id}});
    if (!user) throw new NotFoundException('User Not Found');

    return user;
  }
  findUserByUsername(username: string) {
    const user = this.usersRepository.findOne({
      where: {username}
    })
    if (!user) throw new NotFoundException(`User ${username} is not found.`);
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
