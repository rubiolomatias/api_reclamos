import Visitor from '../../../../src/domain/entities/visitor.entity'
import Category from '../../../../src/domain/entities/category.entity'

import CreateClaimCommand from '../../../../src/application/commands/create.claim.command'
import { CreateClaimHandler } from '../../../../src/application/handlers/create.claim.handler'

import { VisitorRepository } from '../../../../src/infrastructure/repositories/visitor.repository'
import { ClaimRepository } from '../../../../src/infrastructure/repositories/claim.repository'
import { CategoryRepository } from '../../../../src/infrastructure/repositories/category.repository'

describe('unit - create claim handler tests', () => {
  let sut: CreateClaimHandler

  let mockVisitorRepository: VisitorRepository
  let mockClaimRepository: ClaimRepository
  let mockCategoryRepository: CategoryRepository

  beforeEach(() => {
    mockVisitorRepository = new VisitorRepository()
    mockClaimRepository = new ClaimRepository()
    mockCategoryRepository = new CategoryRepository()

    sut = new CreateClaimHandler(
      mockVisitorRepository,
      mockClaimRepository,
      mockCategoryRepository
    )
  })

  test('should create a claim', async () => {
    // arrange
    const visitor = Visitor.create(
      '127.0.0.1',
      'Matias Rubiolo',
      '123456'
    )

    await mockVisitorRepository.save(visitor)

    const category = Category.create(
      'Categoria',
      'Verde'
    )

    await mockCategoryRepository.save(category)

    const command = new CreateClaimCommand(
      visitor.getId(),
      'Titulo reclamo',
      'Descripcion reclamo que detalla el problema',
      category.getId(),
      'Ubicacion del reclamo'
    )

    // act
    await sut.execute(command)

    // asserts
    const claims = await mockClaimRepository.lastClaims() // O implementa un método para buscar la reclamación creada
    expect(claims.length).toBe(1)
    const createdClaim = claims[0]
    expect(createdClaim.getOwner().getId()).toBe(visitor.getId())
  })
})
