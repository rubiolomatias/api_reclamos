import Category from '../../domain/entities/category.entity'
import categoryRepository from '../repositories/category.repository'

class CategorySeeder {
  private category: Array<Category> = []

  public constructor () {
    this.category.push(Category.create('Corte agua', 'Verde'))
    this.category.push(Category.create('Corte luz', 'Verde'))
    this.category.push(Category.create('Corte gas', 'Amarillo'))
    this.category.push(Category.create('Bache', 'Rojo'))
    this.category.push(Category.create('Caida arbol', 'Rojo'))
  }

  public async generate (): Promise<void> {
    for (const category of this.category) {
      await categoryRepository.save(category)
    }
  }
}

export default new CategorySeeder()
