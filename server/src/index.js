import express from 'express'
import path from 'path'

const app = express()

app.get('/', (req, res) => res.sendFile('client/src/html/index.html', { root: path.resolve(__dirname, '../../') }))
app.get('/client.js', (req, res) => res.sendFile('client/dist/index.js', { root: path.resolve(__dirname, '../../') }))

app.listen(8080, () => console.log('Project Rally Point listening on port 8080!')) // eslint-disable-line no-console
