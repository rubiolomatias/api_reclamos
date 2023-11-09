import Claim from '../../domain/entities/claim.entity'
import CreateClaimCommand from '../commands/create.claim.command'
import claimRepository, { ClaimRepository } from '../../infrastructure/repositories/claim.repository'
import visitorRepository, { VisitorRepository } from '../../infrastructure/repositories/visitor.repository'
import categoryRepository, { CategoryRepository } from '../../infrastructure/repositories/category.repository'

export class CreateClaimHandler {
  private visitorRepository: VisitorRepository
  private claimRepository: ClaimRepository
  private categoryRepository: CategoryRepository

  public constructor (
    visitorRepository: VisitorRepository,
    claimRepository: ClaimRepository,
    categoryRepository: CategoryRepository
  ) {
    this.visitorRepository = visitorRepository
    this.claimRepository = claimRepository
    this.categoryRepository = categoryRepository
  }

  public async execute (command: CreateClaimCommand): Promise<void> {
    // Obtener el visitante por su ID
    const owner = await this.visitorRepository.findOneById(command.getOwnerId())

    if (!owner) {
      throw new Error('Owner does not exist')
    }

    const category = await this.categoryRepository.findOneById(command.getCategoryId())

    if (!category) {
      throw new Error('Category not found')
    }

    const claim = Claim.create(
      owner,
      command.getTitle(),
      command.getDescription(),
      category,
      command.getLocation()
    )

    await this.claimRepository.save(claim)
  }
}

export default new CreateClaimHandler(visitorRepository, claimRepository, categoryRepository)
