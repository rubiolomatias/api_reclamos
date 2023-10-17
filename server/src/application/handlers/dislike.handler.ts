import ClaimRepository from '../../infrastructure/repositories/claim.repository'
import DislikeCommand from '../commands/dislike.command'

class DislikeHandler {
  async execute (command: DislikeCommand): Promise<void> {
    const claim = await ClaimRepository.findOneById(command.getClaimId())

    if (claim) {
      claim.addDislike(command.getVisitor())
      await ClaimRepository.save(claim)
    }
  }
}

export default new DislikeHandler()
