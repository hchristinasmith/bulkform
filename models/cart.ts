export interface CartData {
  product_id: number
  quantity: number
  price?: number
  name?: string
}

export interface Cart extends CartData {
  id: number
}
