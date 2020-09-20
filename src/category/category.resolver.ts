import { ValidationPipe } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Article } from '../article/models/article.model';
import { CategoryService } from './category.service';
import { CategoryInput } from './inputs/category.input';
import { Category } from './models/category.model';

@Resolver((_of) => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query((_returns) => [Category])
  async getCategorys(): Promise<Category[]> {
    return this.categoryService.categories({ where: { published: true } });
  }

  @Query((_returns) => Category)
  async getCategoryById(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Category> {
    return this.categoryService.category({ id });
  }

  @Mutation((_returns) => Category)
  async createCategory(
    @Args(
      { name: 'category', type: () => CategoryInput },
      new ValidationPipe({ transform: true }),
    )
    category: CategoryInput,
  ): Promise<Category> {
    return this.categoryService.createCategory(category);
  }

  @Mutation((_returns) => Category)
  async updateCategory(
    @Args('id', { type: () => Int }) id: number,
    @Args(
      { name: 'category', type: () => CategoryInput },
      new ValidationPipe({ transform: true }),
    )
    category: CategoryInput,
  ): Promise<Category> {
    return this.categoryService.updateCategory({
      where: { id },
      data: category,
    });
  }

  @Mutation((_returns) => Category)
  async deleteCategory(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Category> {
    return this.categoryService.deleteCategory({ id });
  }

  @ResolveField()
  async articles(@Parent() category: Category): Promise<Article[]> {
    const { id } = category;

    return this.categoryService.articles({ id });
  }
}
