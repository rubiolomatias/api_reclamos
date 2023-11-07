import claimRepository, { ClaimRepository } from '../../infrastructure/repositories/claim.repository'
import { ReportClaimCommand } from '../commands/report.claim.command'

export class ReportClaimHandler {
  private claimrepository: ClaimRepository

  constructor (claimrepository: ClaimRepository) {
    this.claimrepository = claimrepository
  }

  public async execute (command: ReportClaimCommand): Promise<void> {
    const duplicateClaim = await this.claimrepository.findOneById(command.getId())

    if (!duplicateClaim) {
      throw new Error('Claim not found')
    }

    const originalClaim = await this.claimrepository.findOneById(command.getOriginalId())

    if (!originalClaim) {
      throw new Error('Claim no found')
    }

    duplicateClaim.report(originalClaim)
  }
}

export default new ReportClaimHandler(claimRepository)
