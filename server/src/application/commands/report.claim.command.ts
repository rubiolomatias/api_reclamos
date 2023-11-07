export class ReportClaimCommand {
  private readonly id: string
  private readonly originalId: string

  constructor (id: string, originalId: string) {
    this.id = id
    this.originalId = originalId
  }

  public getId (): string {
    return this.id
  }

  public getOriginalId (): string {
    return this.originalId
  }
}
