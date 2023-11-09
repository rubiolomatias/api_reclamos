import DislikeCommand from '../commands/dislike.command'
import claimRepository, { ClaimRepository } from '../../infrastructure/repositories/claim.repository'
import visitorRepository, { VisitorRepository } from '../../infrastructure/repositories/visitor.repository'

export class DislikeHandler {
  private readonly claimRepository: ClaimRepository
  private readonly visitorRepository: VisitorRepository

  constructor (claimRepository: ClaimRepository, visitorRepository: VisitorRepository) {
    this.claimRepository = claimRepository
    this.visitorRepository = visitorRepository
  }

  async execute (command: DislikeCommand): Promise<void> {
    const claimId = command.getClaimId()
    const claim = await this.claimRepository.findOneById(claimId)

    if (!claim) {
      throw new Error('Claim does not exist')
    }

    const visitor = await this.visitorRepository.findOneById(command.getVisitorId())

    if (!visitor) {
      throw new Error('Visitor not found')
    }

    if (!visitor.validatePin(command.getPin())) {
      throw new Error('Invalid PIN')
    }

    claim.addDislike(visitor.getId())

    await this.claimRepository.save(claim)
  }
}

export default new DislikeHandler(claimRepository, visitorRepository)
