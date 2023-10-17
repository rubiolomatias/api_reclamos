import Visitor from '../../domain/entities/visitor.entity'

class DislikeCommand {
  private readonly claimId: string
  private readonly visitor: Visitor

  constructor (claimId: string, visitor: Visitor) {
    this.claimId = claimId
    this.visitor = visitor
  }

  public getClaimId (): string {
    return this.claimId
  }

  public getVisitor (): Visitor {
    return this.visitor
  }
}

export default DislikeCommand
