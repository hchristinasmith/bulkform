import * as Path from 'node:path'
import productRoutes from './routes/products'
import cartRoutes from './routes/cart'

import express from 'express'

const server = express()
server.use(express.json())

// ADD YOUR API ROUTES HERE
server.use('/api/v1/products', productRoutes)

server.use('/api/v1/cart', cartRoutes)

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
