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
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            name="name"
            onChange={handleChange}
            type="text"
            value={formData.name}
            placeholder="e.g. Skis"
          />
        </div>

        <div>
          <label htmlFor="brand">Brand:</label>
          <input
            id="brand"
            name="brand"
            onChange={handleChange}
            type="text"
            value={formData.brand}
            placeholder="e.g. Line"
          />
        </div>

        <div>
          <label htmlFor="price">Price:</label>
          <input
            id="price"
            name="price"
            onChange={handleChange}
            type="text"
            value={formData.price}
            placeholder="e.g. 9.99"
          />
        </div>

        <button type="submit">Add Product</button>
      </form>
    </>
  )
}
