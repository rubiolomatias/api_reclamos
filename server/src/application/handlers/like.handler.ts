import ClaimRepository from '../../infrastructure/repositories/claim.repository'
import LikeCommand from '../commands/like.command'

class LikeHandler {
  async execute (command: LikeCommand): Promise<void> {
    const claim = await ClaimRepository.findOneById(command.getClaimId())

    if (claim) {
      claim.addLike(command.getVisitor())
      await ClaimRepository.save(claim)
    }
  }
}

export default new LikeHandler()
