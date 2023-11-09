import { Response } from 'express'
import claimRepository, { ClaimRepository } from '../../infrastructure/repositories/claim.repository'

class GetLastClaimsAction {
  private claimRepository: ClaimRepository

  constructor (claimRepository: ClaimRepository) {
    this.claimRepository = claimRepository
  }

  public run = async (res: Response) => {
    try {
      const lastClaims = await this.claimRepository.lastClaims()

      res.status(200).json(lastClaims)
    } catch (error) {
      const { message } = error as Error
      res.status(400).json({ message })
    }
  }
}

export default new GetLastClaimsAction(claimRepository)
