import { Request, Response } from 'express'
import LikeCommand from '../../application/commands/like.command'
import likeHandler, { LikeHandler } from '../../application/handlers/like.handler'

class LikeAction {
  private readonly handler : LikeHandler

  constructor (handler : LikeHandler) {
    this.handler = handler
  }

  public async run (req: Request, res: Response) {
    const { claimId, visitorId, pin } = req.body

    try {
      if (!claimId || !pin) {
        res.status(400).json({ message: 'Claim ID and PIN are required' })
        return
      }

      const command = new LikeCommand(claimId, visitorId, pin)

      await this.handler.execute(command)

      res.status(200).json({ message: 'Disliked successfully' })
    } catch (error) {
      const { message } = error as Error
      res.status(400).json({ message })
    }
  }
}

export default new LikeAction(likeHandler)
