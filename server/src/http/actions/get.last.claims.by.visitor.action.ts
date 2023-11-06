import { Request, Response } from 'express'
import claimRepository, { ClaimRepository } from '../../infrastructure/repositories/claim.repository'

class GetLastClaimsByVisitorAction {
  private claimRepository: ClaimRepository

  constructor (claimRepository: ClaimRepository) {
    this.claimRepository = claimRepository
  }

  public async run (req: Request, res: Response) {
    const { visitorId } = req.body
    try {
      const onFireClaims = await this.claimRepository.lastClaimsByVisitor(visitorId)

      res.status(200).json(onFireClaims)
    } catch (error) {
      const { message } = error as Error
      res.status(400).json({ message })
    }
  }
}

export default new GetLastClaimsByVisitorAction(claimRepository)
