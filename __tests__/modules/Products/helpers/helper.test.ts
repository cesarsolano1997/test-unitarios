import { expect, describe } from '@jest/globals'
import helper from '../../../../src/modules/Products/helpers/helper'
import { mockProducts } from '../../../../src/modules/Products/mocks/mockProducts'

describe('Test unitarios para mi función onFiltered', () => {
  it('Retornar un array lleno', () => {
    expect(helper.onFiltered(mockProducts, 'iPhone 15 Pro')).toStrictEqual([{
      id: 1,
      name: 'iPhone 15 Pro',
      price: 999.99,
      description: 'The latest iPhone with A17 Pro chip',
      image: 'https://images.unsplash.com/photo-1702184117235-56002cb13663?q=80&w=3027&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      stock: 10,
      category: 'Smartphones'
    }])
  })

  it('Retornar un array vacío', () => {
    expect(helper.onFiltered([], '')).toStrictEqual([])
  })
})
