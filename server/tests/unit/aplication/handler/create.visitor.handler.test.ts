import { CreateVisitorHandler } from '../../../../src/application/handlers/create.visitor.handler'
import CreateVisitorCommand from '../../../../src/application/commands/create.visitor.command'

import { VisitorRepository } from '../../../../src/infrastructure/repositories/visitor.repository'

describe('unit - create visitor handler tests', () => {
  let sut: CreateVisitorHandler

  let mockVisitorRepository: VisitorRepository

  beforeEach(() => {
    mockVisitorRepository = new VisitorRepository()

    sut = new CreateVisitorHandler(mockVisitorRepository)
  })

  test('should create a visitor', async () => {
    const command = new CreateVisitorCommand(
      '192.0.10.100',
      'maty_rubiolo',
      '29082001'
    )

    // act
    await sut.execute(command)

    // asserts
    const visitors = await mockVisitorRepository.getAll()
    expect(visitors.length).toBe(1)
    const createdVisitor = visitors[0]
    expect(createdVisitor).not.toBeNull()
    expect(createdVisitor?.getIp()).toBe('192.0.10.100')
    expect(createdVisitor?.getNickname()).toBe('maty_rubiolo')
    expect(createdVisitor?.getPin()).toBe('29082001')
  })
})
