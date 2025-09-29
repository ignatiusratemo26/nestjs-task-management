import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { EntityManager, Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,
    private readonly entityManager: EntityManager
  ) {}

  async create(createItemDto: CreateItemDto) {
    const item = new Item(createItemDto);
    await this.entityManager.save(item);

  }

  async findAll() {
    return this.itemsRepository.find();
  }

  async findOne(id: number) {
    return this.itemsRepository.findOneBy({id});
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    const item = await this.findOne(id);
    if (!item) throw new NotFoundException(`The item of ID ${id} is not found`);

    // const { public } = updateItemDto;
    item.public = updateItemDto.public;
    await this.entityManager.save(item);
    return item;
  }

  async remove(id: number) {
    const item = await this.findOne(id);
    if (!item) throw new NotFoundException(`The item of ID ${id} is not found`);
    await this.itemsRepository.delete(id);
    return `Item of ID ${id} has been deleted`;
  }
}
