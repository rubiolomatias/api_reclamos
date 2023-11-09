import { Request, Response } from 'express'
import createClaimHandler, { CreateClaimHandler } from '../../application/handlers/create.claim.handler'
import CreateClaimCommand from '../../application/commands/create.claim.command'

class CreateClaimAction {
  private readonly handler: CreateClaimHandler

  constructor (handler: CreateClaimHandler) {
    this.handler = handler
  }

  public run = async (req: Request, res: Response) => {
    const { owner, title, description, category, location } = req.body
    try {
      if (!owner || !title || !description || !category || !location) {
        res.status(400).json({ message: 'All fields are required' })
        return
      }

      const command = new CreateClaimCommand(
        owner,
        title,
        description,
        category,
        location
      )
      await this.handler.execute(command)

      res.status(201).json(
        { message: 'Claim created sucessfully' }
      )
    } catch (error) {
      const { message } = error as Error
      res.status(400).json({ message })
    }
  }
}

export default new CreateClaimAction(createClaimHandler)
