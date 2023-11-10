import { Request, Response } from 'express'
import { ReportClaimCommand } from '../../../../src/application/commands/report.claim.command'
import { ReportClaimHandler } from '../../../../src/application/handlers/report.claim.handler'
import ReportClaimAction from '../../../../src/http/actions/report.claim.action'

// Importa las entidades y repositorios necesarios para tus pruebas
import Visitor from '../../../../src/domain/entities/visitor.entity'
import Category from '../../../../src/domain/entities/category.entity'
import Claim from '../../../../src/domain/entities/claim.entity'
import { VisitorRepository } from '../../../../src/infrastructure/repositories/visitor.repository'
import { ClaimRepository } from '../../../../src/infrastructure/repositories/claim.repository'

describe('unit - report claim action tests', () => {
  let sut: ReportClaimAction

  let mockReportClaimHandler: ReportClaimHandler
  let mockVisitorRepository: VisitorRepository
  let mockClaimRepository: ClaimRepository

  beforeEach(() => {
    mockVisitorRepository = new VisitorRepository()
    mockClaimRepository = new ClaimRepository()
    mockReportClaimHandler = new ReportClaimHandler(mockClaimRepository)

    sut = new ReportClaimAction(mockReportClaimHandler)
  })

  test('should report a claim', async () => {
    // arrange
    const visitor = Visitor.create('127.0.0.1', 'Matias Rubiolo', '123456')
    await mockVisitorRepository.save(visitor)

    const category = Category.create('category', 'rojo')

    const originalClaim = Claim.create(visitor, 'original claim', 'description', category, 'location')
    await mockClaimRepository.save(originalClaim)

    const claim = Claim.create(visitor, 'test claim', 'description', category, 'location')
    await mockClaimRepository.save(claim)

    const command = new ReportClaimCommand(claim.getId(), originalClaim.getId())

    // act
    await sut.run({ body: { id: claim.getId(), originalId: originalClaim.getId() } } as Request, {} as Response)

    // asserts
    const reportedClaim = await mockClaimRepository.findOneById(claim.getId())
    expect(reportedClaim?.cloneOf).toBe(originalClaim)
  })

  test('should fail when original claim not found', async () => {
    // arrange
    const visitor = Visitor.create('127.0.0.1', 'Matias Rubiolo', '123456')
    await mockVisitorRepository.save(visitor)

    const category = Category.create('category', 'rojo')

    const claim = Claim.create(visitor, 'test claim', 'description', category, 'location')
    await mockClaimRepository.save(claim)

    const command = new ReportClaimCommand(claim.getId(), '')

    // act
    await sut.run({ body: { id: claim.getId(), originalId: 'nonexistentId' } } as Request, {} as Response)

    // asserts
    const reportedClaim = await mockClaimRepository.findOneById(claim.getId())
    expect(reportedClaim?.cloneOf).toBe(null)
  })
})
