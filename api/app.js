import express from 'express'
import cors from 'cors'

const api = express()
const port = 3000

api.use(cors())
api.use(express.json())

api.get('/api/test', (req, res) => {
  res.json({ message: 'Backend works 🚀' })
})

api.post('/api/data', (req, res) => {
  res.json({ received: req.body })
})

api.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})