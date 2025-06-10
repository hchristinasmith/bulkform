export interface ProductData {
  name: string
  brand: string
  price: number
}

export interface Product extends ProductData {
  id: number
}
