import { Request, Response } from 'express'
import claimRepository from '../../infrastructure/repositories/claim.repository'

class GetLastClaimsByVisitorAction {
  public run = async (req: Request, res: Response) => {
    const { visitorId } = req.body
    try {
      const categories = await claimRepository.lastClaimsByVisitor(visitorId)

      res.status(200).json(categories)
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los ultimos reclamos del visitante.' })
    }
  }
}

export default new GetLastClaimsByVisitorAction()
