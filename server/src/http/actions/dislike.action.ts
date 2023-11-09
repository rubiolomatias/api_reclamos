import { Request, Response } from 'express'
import DislikeCommand from '../../application/commands/dislike.command'
import dislikeHandler, { DislikeHandler } from '../../application/handlers/dislike.handler'

class DislikeAction {
  private readonly handler : DislikeHandler

  constructor (handler : DislikeHandler) {
    this.handler = handler
  }

  public async run (req: Request, res: Response) {
    const { claimId, visitorId, pin } = req.body

    try {
      if (!claimId || !pin) {
        res.status(400).json({ message: 'Claim ID and PIN are required' })
        return
      }

      const command = new DislikeCommand(claimId, visitorId, pin)

      await this.handler.execute(command)

      res.status(200).json({ message: 'Disliked successfully' })
    } catch (error) {
      const { message } = error as Error
      res.status(400).json({ message })
    }
  }
}

export default new DislikeAction(dislikeHandler)
