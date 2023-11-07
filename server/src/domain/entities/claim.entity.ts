import { v4 } from 'uuid'
import Visitor from './visitor.entity'
import Category from './category.entity'

class Claim {
  private id: string
  private owner: Visitor
  private title: string
  private description: string
  private category: Category
  private location: string
  private createdAt: Date
  private cloneOf: Claim | null
  private likes: Visitor[] = []
  private dislikes: Visitor[] = []

  private constructor (
    id: string,
    owner: Visitor,
    title: string,
    description: string,
    category: Category,
    location: string,
    createdAt: Date,
    cloneOf: Claim | null
  ) {
    this.id = id
    this.owner = owner
    this.title = title
    this.description = description
    this.category = category
    this.location = location
    this.createdAt = createdAt
    this.cloneOf = cloneOf
  }

  public static create (
    owner: Visitor,
    title: string,
    description: string,
    category: Category,
    location: string,
    createdAt: Date,
    cloneOf: Claim | null
  ): Claim {
    return new Claim(v4(), owner, title, description, category, location, createdAt, cloneOf)
  }

  public addLike (visitor: Visitor): void {
    if (!this.likes.some((v) => v.getId() === visitor.getId())) {
      this.likes.push(visitor)
    }
  }

  public addDislike (visitor: Visitor): void {
    if (!this.dislikes.some((v) => v.getId() === visitor.getId())) {
      this.dislikes.push(visitor)
    }
  }

  public report (originalClaim: Claim) {
    if (this.createdAt.getTime() < originalClaim.createdAt.getTime()) {
      throw new Error('Origianl claim is older than duplicated claim')
    }
    this.cloneOf = originalClaim
  }

  public getId (): string {
    return this.id
  }

  public getOwner (): Visitor {
    return this.owner
  }

  public getCreatedAt (): Date {
    return this.createdAt
  }

  public getLikesCount (): number {
    return this.likes.length
  }

  public getDislikesCount (): number {
    return this.likes.length
  }
}

export default Claim
