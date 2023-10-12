import { Request, Response } from 'express'
import GetCategoriesCommand from '../../application/commands/get.categories.command'
import GetCategoriesHandler from '../../application/handlers/get.categories.handler'

class GetCategoriesAction {
  public async run (req: Request, res: Response) {
    const { categoryRepository } = req.body

    try {
      const command = new GetCategoriesCommand(categoryRepository)

      await GetCategoriesHandler.execute(command)

      return res.status(201).json({ message: 'Categories obtained successfully' })
    } catch (error) {
      const { message } = error as Error
      res.status(400).json({ message })
    }
  }
}

export default new GetCategoriesAction()
