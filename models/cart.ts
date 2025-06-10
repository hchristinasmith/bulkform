export interface CartData {
  product_id: number
  quantity: number
}

export interface Cart extends CartData {
  id: number
}
