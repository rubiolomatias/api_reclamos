import Visitor from '../../domain/entities/visitor.entity'
import visitorRepository from '../repositories/visitor.repository'

class VisitorSeeder {
  private visitors: Array<Visitor> = []

  public constructor () {
    this.visitors.push(Visitor.create('192.168.0.0', 'Matias', 'TU4F*'))
    this.visitors.push(Visitor.create('192.168.0.1', 'Agustin', '8Zsq^'))
    this.visitors.push(Visitor.create('192.168.0.2', 'Romima', '2se5%'))
    this.visitors.push(Visitor.create('192.168.0.3', 'Nadin', 'oA6o!'))
    this.visitors.push(Visitor.create('192.168.0.4', 'Agustin', '73^J&'))
  }

  public async generate (): Promise<void> {
    for (const visitor of this.visitors) {
      await visitorRepository.save(visitor)
    }
  }
}

export default new VisitorSeeder()
