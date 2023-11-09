class LikeCommand {
  private readonly claimId: string
  private readonly visitorId: string
  private readonly pin: string

  constructor (claimId: string, visitorId: string, pin: string) {
    this.claimId = claimId
    this.visitorId = visitorId
    this.pin = pin
  }

  public getClaimId (): string {
    return this.claimId
  }

  public getVisitorId (): string {
    return this.visitorId
  }

  public getPin (): string {
    return this.pin
  }
}

export default LikeCommand
