class CreateClaimCommand {
  private readonly ownerId: string
  private readonly title: string
  private readonly description: string
  private readonly categoryId: string
  private readonly location: string

  public constructor (
    ownerId: string,
    title: string,
    description: string,
    categoryId: string,
    location: string) {
    this.ownerId = ownerId
    this.title = title
    this.description = description
    this.categoryId = categoryId
    this.location = location
  }

  public getOwnerId (): string {
    return this.ownerId
  }

  public getTitle (): string {
    return this.title
  }

  public getDescription (): string {
    return this.description
  }

  public getCategoryId (): string {
    return this.categoryId
  }

  public getLocation (): string {
    return this.location
  }
}

export default CreateClaimCommand
