const http = require ('http')
const URL = require ('url')
const fs = require('fs')
const path = require('path')


const data = require('./urls.json')

function writeFile(cb) {
    fs.writeFile(
        path.join(__dirname, 'urls.json'),
        JSON.stringify(data, null, 2),
        err => {
            if (err) throw err

            cb(JSON.stringify({message: 'ok'}))
        }
    )
}

http.createServer((req, res) => {
    
    res.writeHead(200,{
        'Access-Control-Allow-Origin' : '*'
    })

    const { name, url, del } = URL.parse(req.url, true).query

    //Todos os dados do JSON 
    if(!name || !url)
        return res.end(JSON.stringify(data, undefined, 2))
    
    if(del) {
        data.urls = data.urls.filter(item => String(item.url) !== String(url))
        return writeFile((message) => {
            res.end(message)
        })

    }
    
    data.urls.push({name, url})

    return writeFile((message) => res.end(message))

}).listen('5000', () => console.log('Api está rodando na porta 5000'))