import { Injectable } from '@nestjs/common';
import {
  Article,
  Category,
  CategoryCreateInput,
  CategoryOrderByInput,
  CategoryUpdateInput,
  CategoryWhereInput,
  CategoryWhereUniqueInput,
} from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prismaService: PrismaService) {}

  async category(
    categoryWhereUniqueInput: CategoryWhereUniqueInput,
  ): Promise<Category | null> {
    return this.prismaService.category.findOne({
      where: categoryWhereUniqueInput,
    });
  }

  async categories(params: {
    skip?: number;
    take?: number;
    cursor?: CategoryWhereUniqueInput;
    where?: CategoryWhereInput;
    orderBy?: CategoryOrderByInput;
  }): Promise<Category[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prismaService.category.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createCategory(data: CategoryCreateInput): Promise<Category> {
    return this.prismaService.category.create({
      data,
    });
  }

  async updateCategory(params: {
    where: CategoryWhereUniqueInput;
    data: CategoryUpdateInput;
  }): Promise<Category> {
    const { data, where } = params;
    return this.prismaService.category.update({
      data,
      where,
    });
  }

  async deleteCategory(where: CategoryWhereUniqueInput): Promise<Category> {
    return this.prismaService.category.delete({
      where,
    });
  }

  async articles(
    categoryWhereUniqueInput: CategoryWhereUniqueInput,
  ): Promise<Article[] | null> {
    return this.prismaService.category
      .findOne({
        where: categoryWhereUniqueInput,
      })
      .articles();
  }
}
