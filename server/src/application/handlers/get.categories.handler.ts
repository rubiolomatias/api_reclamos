import Category from '../../domain/entities/category.entity'
import { CategoryRepository } from '../../infrastructure/repositories/category.repository'
import GetCategoriesCommand from '../commands/get.categories.command'

class GetCategoriesHandler {
  private categoryRepository: CategoryRepository

  constructor (categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository
  }

  public async execute (command: GetCategoriesCommand): Promise<Category[]> {
    return command.getAll()
  }
}

export default GetCategoriesHandler
