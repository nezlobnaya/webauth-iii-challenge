const server = require('./server')
const PORT = process.envPORT || 8000

server.listen(PORT, () => {
    console.log(`\n*** Server running on http://localhost:${PORT}`)
})