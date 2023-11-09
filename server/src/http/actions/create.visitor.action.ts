import { Request, Response } from 'express'
import CreateVisitorCommand from '../../application/commands/create.visitor.command'
import createVisitorHandler, { CreateVisitorHandler } from '../../application/handlers/create.visitor.handler'

class CreateVisitorAction {
  private readonly handler: CreateVisitorHandler

  constructor (handler: CreateVisitorHandler) {
    this.handler = handler
  }

  public run = async (req: Request, res: Response) => {
    const { ip, nickname, pin } = req.body
    try {
      if (!ip || !nickname) {
        res.status(400).json({ message: 'All fields are required' })
        return
      }

      const command = new CreateVisitorCommand(ip, nickname, pin)

      await this.handler.execute(command)

      res.status(201).json({ message: 'Visitor create sucessfully' })
    } catch (error) {
      const { message } = error as Error
      res.status(400).json({ message })
    }
  }
}

export default new CreateVisitorAction(createVisitorHandler)
