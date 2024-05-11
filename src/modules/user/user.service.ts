import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  create(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({data: {
      ...data,
      userSetting: {
        create: {
          smsEnabled: true,
          notificationsOn: false
        }
      }
    }})
  }

  findAll() {
    return this.prisma.user.findMany({ include: { userSetting: {
        select: {
          smsEnabled: true,
          notificationsOn: true
        }
      },
      post: {
        select: {
          title: true,
          description: true
        }
      }
    } });
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id }, include: {userSetting: {
        select: {
          smsEnabled: true,
          notificationsOn: true
        }
      }, post: {
        select: {
          title: true,
          description: true
        }
      }
  
    }})
  }

  public async update(id: number, data: Prisma.UserUpdateInput) {
    const user = await this.findOne(id);
    if(!user) throw new HttpException("User Not Found", 404);
    if(data.username){
      const findUser = await this.prisma.user.findUnique({ where: {username: data.username as string}});
      if(findUser) throw new HttpException("Username already taken", 400);
    }
    return this.prisma.user.update({ where: { id }, data})
  }

  public async settings(userId: number, data: Prisma.UserSettingUpdateInput) {
    const user = await this.findOne(userId);
    if(!user) throw new HttpException("User Not Found", 404);
    if(!user.userSetting) throw new HttpException("Bad Request", 400);
    return this.prisma.userSetting.update({ where: { userId }, data})
  }

  public async remove(id: number) {
    const user = await this.findOne(id);
    if(!user) throw new HttpException("User Not Found", 404);
    return this.prisma.user.delete({ where: { id }})
  }
}
