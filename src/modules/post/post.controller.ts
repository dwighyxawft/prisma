import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreateGroupPostDto } from './dto/create-group-post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() {userId, ...createPostDto}: CreatePostDto) {
    return this.postService.create(userId, createPostDto);
  }

  @Post("group")
  @UsePipes(ValidationPipe)
  group(@Body() {userIds, ...createGroupPostDto}: CreateGroupPostDto) {
    return this.postService.group(userIds, createGroupPostDto);
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

   @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
