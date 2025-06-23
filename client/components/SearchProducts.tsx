import { useState } from 'react'

interface Props {
  onSearch: (name: string, brand: string) => void
}

export default function Searchbar({ onSearch }: Props) {
  const [name, setName] = useState('')
  const [brand, setBrand] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(name.trim(), brand.trim())
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="search-name">Name:</label>
        <input
          id="search-name"
          name="name"
          type="text"
          placeholder="Search by name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="search-brand">Brand:</label>
        <input
          id="search-brand"
          name="brand"
          type="text"
          placeholder="Search by brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  )
}
