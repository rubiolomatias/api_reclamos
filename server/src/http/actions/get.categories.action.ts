import { Request, Response } from 'express'
import categoryRepository from '../../infrastructure/repositories/category.repository'

class GetCategoriesAction {
  public run = async (_req: Request, res: Response) => {
    try {
      const categories = await categoryRepository.getAll()

      res.status(200).json(categories)
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los visitantes.' })
    }
  }
}

export default new GetCategoriesAction()
