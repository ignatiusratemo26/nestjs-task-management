import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { EntityManager, Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Listing } from './entities/listing.entity';
import { CreateListingDto } from './dto/listing-item.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';
import { CreateTagDto } from './dto/create-tag.dto';
import { Tag } from './entities/tag.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,
    private readonly entityManager: EntityManager
  ) {}

  async create(createItemDto: CreateItemDto) {

    const listing = new Listing({
      ...createItemDto.listing,
      rating: 0,
    })

    const tags = createItemDto.tags.map(
      (createTagDto) => new Tag(createTagDto),
    )
    const item = new Item({
      ...createItemDto,
      comments:[],
      tags,
      listing,
    });
    await this.entityManager.save(item);

  }

  async findAll() {
    return this.itemsRepository.find();
  }

  async findOne(id: number) {
    return this.itemsRepository.findOne({
      where: {id},
      relations: { listing: true, comments: true, tags: true}
  });
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    // const item = await this.findOne(id);
    // if (!item) throw new NotFoundException(`The item of ID ${id} is not found`);

    // item.public = updateItemDto.public;
    
    // const comments = updateItemDto.comments.map(
    //   (createCommentDto) => new Comment(createCommentDto),
    // );
    // item.comments.push(...comments);
    // await this.entityManager.save(item);
    // return item;
    await this.entityManager.transaction(async (entityManager) => {
    const item = await this.findOne(id);
    if (!item) throw new NotFoundException(`The item of ID ${id} is not found`);

    item.public = updateItemDto.public;
    
    const comments = updateItemDto.comments.map(
      (createCommentDto) => new Comment(createCommentDto),
    );
    item.comments.push(...comments);
    await entityManager.save(item);

    // const tagContent = `${Math.random()}`;
    // const tag = new Tag({content: tagContent});
    // await entityManager.save(tag);
    // console.log(tag);

    });
  }

  async remove(id: number) {
    const item = await this.findOne(id);
    if (!item) throw new NotFoundException(`The item of ID ${id} is not found`);
    await this.itemsRepository.delete(id);
    return `Item of ID ${id} has been deleted`;
  }
}