import { Request, Response } from 'express'
import claimRepository, { ClaimRepository } from '../../infrastructure/repositories/claim.repository'

class GetOnFireClaimsAction {
  private claimRepository: ClaimRepository

  constructor (claimRepository: ClaimRepository) {
    this.claimRepository = claimRepository
  }

  public run = async (req: Request, res: Response) => {
    const { id } = req.params
    const { originalId } = req.body

    if (!originalId || !id) {
      res.status(400).json({ message: 'originalId is required' })
      return
    }
    try {
      const onFireClaims = await this.claimRepository.lastHourOnFire()

      res.status(200).json(onFireClaims)
    } catch (error) {
      const { message } = error as Error
      res.status(400).json({ message })
    }
  }
}

export default new GetOnFireClaimsAction(claimRepository)
