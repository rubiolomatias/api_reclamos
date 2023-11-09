import { Request, Response } from 'express'
import claimRepository from '../../infrastructure/repositories/claim.repository'

class GetOnFireClaiimsAction {
  public run = async (req: Request, res: Response) => {
    try {
      const categories = await claimRepository.lastHourOnFire()

      res.status(200).json(categories)
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los ultimos reclamos mas aprobados.' })
    }
  }
}

export default new GetOnFireClaiimsAction()
