import { v4 } from 'uuid'
import Visitor from './visitor.entity'
import Category from './category.entity'

class Claim {
  id: string
  owner: Visitor
  title: string
  description: string
  category: Category
  location: string
  createAt: Date
  cloneOf: Claim | null
  private dislikes: string[] = []
  private likes: string[] = []

  private constructor (
    id: string,
    owner: Visitor,
    title: string,
    description: string,
    category: Category,
    location: string,
    createAt: Date
  ) {
    this.id = id
    this.owner = owner
    this.title = title
    this.description = description
    this.category = category
    this.location = location
    this.createAt = createAt
    this.cloneOf = null
  }

  public static create (
    owner: Visitor,
    title: string,
    description: string,
    category: Category,
    location: string
  ): Claim {
    return new Claim(v4(), owner, title, description, category, location, new Date())
  }

  public addLike (id: string): void {
    if (this.hasVisitorLiked(id)) {
      throw new Error('Visitor already liked this claim.')
    }

    this.likes.push(id)
  }

  public addDislike (id: string): void {
    if (this.hasVisitorDisliked(id)) {
      throw new Error('Visitor already dislike this claim.')
    }

    this.dislikes.push(id)
  }

  public hasVisitorLiked (id: string): boolean {
    return this.likes.includes(id)
  }

  public hasVisitorDisliked (id: string): boolean {
    return this.dislikes.includes(id)
  }

  report (originalClaim: Claim) {
    if (this.createAt.getTime() < originalClaim.createAt.getTime()) {
      throw new Error('Original claim is older than duplicated claim')
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
    return this.createAt
  }

  public getLikesCount (): number {
    return this.likes.length
  }

  public getDislikesCount (): number {
    return this.likes.length
  }
}

export default Claim
