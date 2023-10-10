import { Request, Response } from 'express'
import CreateClaimHandler from '../../application/handlers/create.claim.handler'
import CreateClaimCommand from '../../application/commands/create.claim.command'

class CreateClaimAction {
  public async run (req: Request, res: Response) {
    const { ownerId, title, description, categoryId, location, createdAt, cloneOf } = req.body

    try {
      const command = new CreateClaimCommand(ownerId, title, description, categoryId, location, createdAt, cloneOf)

      await CreateClaimHandler.execute(command)

      return res.status(201).json({ message: 'Claim created successfully' })
    } catch (error) {
      const { message } = error as Error
      res.status(400).json({ message })
    }
  }
}

export default new CreateClaimAction()
