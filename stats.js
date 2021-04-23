const os = require('os')
const log = require('./logger')


setInterval(() => {
    const { freemem, totalmem } = os

    const mem = parseInt(freemem() / 1024 / 1024)
    const total = parseInt(totalmem() / 1024/ 1024)
    const percent = parseInt((mem/total)* 100) 

    const stats = {
      free: `${mem} MB`,
      total: `${total} MB`,
      usage: `${percent}%`,
      date :  new Date()
    }

    console.clear()
    console.table(stats)
    log(JSON.stringify(stats, undefined, 2))
    
}, 2000)