import { Request, Response } from 'express'
import LikeCommand from '../../application/commands/like.command'
import LikeHandler from '../../application/handlers/like.handler'
import VisitorRepository from '../../infrastructure/repositories/visitor.repository'

class LikeClaimAction {
  public async run (req: Request, res: Response) {
    const { claimId, visitorId } = req.body

    try {
      const visitor = await VisitorRepository.findOneById(visitorId)

      if (!visitor) {
        throw new Error('Visitor does not exist')
      }

      const command = new LikeCommand(claimId, visitor)
      const handler = LikeHandler

      await handler.execute(command)

      return res.status(200).json({ message: 'Claim liked successfully' })
    } catch (error) {
      const { message } = error as Error
      res.status(400).json({ message })
    }
  }
}

export default new LikeClaimAction()
