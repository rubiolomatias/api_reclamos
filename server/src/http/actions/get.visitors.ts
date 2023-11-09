import { Request, Response } from 'express'
import visitorRepository from '../../infrastructure/repositories/visitor.repository'

class GetVisitorsAction {
  public run = async (_req: Request, res: Response) => {
    try {
      const visitors = await visitorRepository.getAll()

      res.status(200).json(visitors)
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los visitantes.' })
    }
  }
}

export default new GetVisitorsAction()
