import { Response } from 'express'
import categoryRepository, { CategoryRepository } from '../../infrastructure/repositories/category.repository'

class GetCategoriesAction {
  private categoryRepository: CategoryRepository

  constructor (categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository
  }

  public async run (res: Response) {
    try {
      const getCategories = await this.categoryRepository.getAll()

      res.status(200).json(getCategories)
    } catch (error) {
      const { message } = error as Error
      res.status(400).json({ message })
    }
  }
}

export default new GetCategoriesAction(categoryRepository)
