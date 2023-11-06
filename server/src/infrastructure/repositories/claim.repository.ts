import Claim from '../../domain/entities/claim.entity'

class ClaimRepository {
  private claims: Claim[]

  public constructor () {
    this.claims = []
  }

  public async save (claim: Claim): Promise<void> {
    const saveClaim = this.claims.find(a => a.getId() === claim.getId())
    if (saveClaim) {
      this.claims.splice(this.claims.indexOf(saveClaim), 1)
    }
    this.claims.push(claim)
  }

  public async findOneById (id: string): Promise<Claim | null> {
    const claim = this.claims.find(a => a.getId() === id)

    return claim || null
  }

  public async lastHourOnFire (): Promise<Claim[]> {
    const oneHourAgo = new Date()
    oneHourAgo.setHours(oneHourAgo.getHours() - 1)

    return this.claims
      .filter(claim => claim.getCreatedAt() >= oneHourAgo)
      .sort((a, b) => b.getLikesCount() - a.getLikesCount())
      .slice(0, 5)
  }

  public async lastClaims (): Promise<Claim[]> {
    const lastFiveClaims = this.claims
      .sort((a, b) => b.getCreatedAt().getTime() - a.getCreatedAt().getTime())
      .slice(0, 5)

    return lastFiveClaims
  }

  public async lastClaimsByVisitor (visitorId: string): Promise<Claim[]> {
    const visitorClaims = this.claims.filter(claim => claim.getOwner().getId() === visitorId)
    const lastFiveVisitorClaims = visitorClaims.slice(-5)

    return lastFiveVisitorClaims
  }
}

export default new ClaimRepository()
export { ClaimRepository }
