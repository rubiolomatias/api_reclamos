import LikeCommand from '../commands/like.command'
import claimRepository, { ClaimRepository } from '../../infrastructure/repositories/claim.repository'
import visitorRepository, { VisitorRepository } from '../../infrastructure/repositories/visitor.repository'

export class LikeHandler {
  private readonly claimRepository: ClaimRepository
  private readonly visitorRepository: VisitorRepository

  constructor (claimRepository: ClaimRepository, visitorRepository: VisitorRepository) {
    this.claimRepository = claimRepository
    this.visitorRepository = visitorRepository
  }

  async execute (command: LikeCommand): Promise<void> {
    const id = command.getClaimId()
    const owner = command.getVisitorId()
    const pin = command.getPin()

    const visitor = await this.visitorRepository.findOneById(owner)

    if (!visitor) {
      throw new Error('Visitor not found')
    }

    const claim = await this.claimRepository.findOneById(id)
    if (!claim) {
      throw new Error('Claim not found')
    }

    if (!visitor.validatePin(pin)) {
      throw new Error('Invalid PIN')
    }

    claim.addLike(visitor.getId())

    await this.claimRepository.save(claim)
  }
}

export default new LikeHandler(claimRepository, visitorRepository)
