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
      <input
        type="text"
        placeholder="Search by name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Search by brand"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  )
}
