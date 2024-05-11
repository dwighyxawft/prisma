import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService){}
  create(userId: number, data: Prisma.PostCreateWithoutUserInput) {
    return this.prisma.post.create({ data: {
      ...data, userId
    } })
  }

  group(userId: number[], data: Prisma.PostCreateWithoutUserInput) {
    return this.prisma.groupPost.create({ data: {
        ...data,
        user: {
          create: userId.map(userId => ({userId}))
        }
    } })
  }

  findAll() {
    return `This action returns all post`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
