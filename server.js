const app = require('./app/app')
const server = require('http').createServer(app)

// app.set('port', 3131)
server.listen(3000, '10.1.1.28', () => {
  console.log(`Server running`)
})