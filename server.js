const http = require ('http')
const fs = require('fs')
const path = require('path')


http.createServer((req, res) => {

    const file = req.url === '/' ? 'index.html' : req.url
    const filePath = path.join(__dirname, 'client', file)
    const extname = path.extname(filePath)

    const allowedFileTypes = ['.html', '.css', '.js']
    
    const allowed = allowedFileTypes.find(item => item == extname  )

    if (!allowed) return

    fs.readFile(
        filePath,
        (err, content) => {
            if(err) throw err

            res.end(content)
        }
    )


}).listen('4200', () => console.log('Servidor está rodando'))