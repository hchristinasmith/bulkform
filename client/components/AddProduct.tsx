import { useState } from 'react'
import { ProductData } from '../../models/products'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addProduct } from '../apis/products'

export default function AddProduct() {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    price: '',
  })

  const queryClient = useQueryClient()

  const addProductMutation = useMutation({
    mutationFn: (newProduct: ProductData) => addProduct(newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value
    const propertyName = e.currentTarget.id
    setFormData({ ...formData, [propertyName]: newValue })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newProduct: ProductData = {
      name: formData.name,
      brand: formData.brand,
      price: Number(formData.price),
    }

    addProductMutation.mutate(newProduct)
    setFormData({
      name: '',
      brand: '',
      price: '',
    })
  }

  return (
    <>
      <header className="header">
        <h1>Add Product</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input
          id="name"
          onChange={handleChange}
          type="text"
          value={formData.name}
          placeholder={'name'}
        />
        <label htmlFor="brand">Brand: </label>
        <input
          id="brand"
          onChange={handleChange}
          type="text"
          value={formData.brand}
          placeholder={'brand'}
        />
        <label htmlFor="brand">Price: </label>
        <input
          id="price"
          onChange={handleChange}
          type="text"
          value={formData.price}
          placeholder={'price'}
        />
        <button type="submit">Add Product</button>
      </form>
    </>
  )
}
