import { Request, Response } from 'express'
import { ReportClaimCommand } from '../../application/commands/report.claim.command'
import reportClaimHandler, { ReportClaimHandler } from '../../application/handlers/report.claim.handler'

class ReportClaimAction {
  private handler: ReportClaimHandler

  constructor (handler: ReportClaimHandler) {
    this.handler = handler
  }

  public async run (req: Request, res: Response): Promise<void> {
    const { id } = req.params
    const { originalId } = req.body

    if (!originalId || !id) {
      res.status(400).json({ message: 'originalId is required' })
      return
    }

    try {
      const command = new ReportClaimCommand(id, originalId)
      await this.handler.execute(command)
      res.status(200).json({ message: 'Claim Reported' })
    } catch (error) {
      const { message } = error as Error
      res.status(400).json({ message })
    }
  }
}

export default new ReportClaimAction(reportClaimHandler)
