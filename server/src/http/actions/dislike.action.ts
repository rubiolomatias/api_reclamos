import { Request, Response } from 'express'
import DislikeCommand from '../../application/commands/dislike.command'
import DislikeHandler from '../../application/handlers/dislike.handler'
import VisitorRepository from '../../infrastructure/repositories/visitor.repository'

class DislikeAction {
  public async run (req: Request, res: Response) {
    const { claimId, visitorId } = req.body

    try {
      const visitor = await VisitorRepository.findOneById(visitorId)

      if (!visitor) {
        throw new Error('Visitor does not exist')
      }

      const command = new DislikeCommand(claimId, visitor)

      await DislikeHandler.execute(command)
      return res.status(200).json({ message: 'Claim disliked successfully' })
    } catch (error) {
      const { message } = error as Error
      res.status(400).json({ message })
    }
  }
}

export default new DislikeAction()
