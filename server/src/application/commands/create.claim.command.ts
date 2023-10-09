import Visitor from '../../domain/entities/visitor.entity'
import Category from '../../domain/entities/category.entity'
import Claim from '../../domain/entities/claim.entity'

class CreateClaimCommand {
  private readonly ownerId: Visitor
  private readonly title: string
  private readonly description: string
  private readonly categoryId: Category
  private readonly location: string
  private readonly createdAt: Date
  private readonly cloneOf: Claim | null

  public constructor (
    ownerId: Visitor,
    title: string,
    description: string,
    categoryId: Category,
    location: string,
    createdAt: Date,
    cloneOf: Claim) {
    this.ownerId = ownerId
    this.title = title
    this.description = description
    this.categoryId = categoryId
    this.location = location
    this.createdAt = createdAt
    this.cloneOf = cloneOf
  }

  public getOwnerId (): Visitor {
    return this.ownerId
  }

  public getTitle (): string {
    return this.title
  }

  public getDescription (): string {
    return this.description
  }

  public getCategoryId (): Category {
    return this.categoryId
  }

  public getLocation (): string {
    return this.location
  }

  public getCreatedAt (): Date {
    return this.createdAt
  }

  public getCloneOf (): Claim | null {
    return this.cloneOf
  }
}

export default CreateClaimCommand
