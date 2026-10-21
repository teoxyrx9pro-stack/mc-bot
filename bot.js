const http = require('http');
http.createServer((req, res) => res.end('Bot radi!')).listen(process.env.PORT || 3000);
const mineflayer = require('mineflayer')

const bot = mineflayer.createBot({
  host: 'shiftsmp.falix.gg',
  port: 23389,
  username: 'BuilderBot', // Promijenili smo ime da izgleda manje sumnjivo
  version: '1.21.1' // Forsiramo točnu verziju da se lakše spoji
})

bot.once('spawn', () => {
  console.log('Bot je uspješno ušao na server i spreman je!')
  
  // Skače svakih 12 sekundi
  setInterval(() => {
    bot.setControlState('jump', true)
    setTimeout(() => {
      bot.setControlState('jump', false)
    }, 500)
  }, 12000)
})

// Automatski se spaja ponovno ako ga server izbaci
bot.on('end', () => {
  console.log('Bot je izbačen, pokušavam ponovno spajanje za 5 sekundi...')
  setTimeout(() => {
    // Skripta se sama ponovno pokreće
    process.exit(1)
  }, 5000)
})

bot.on('error', (err) => {
  console.log('Greška:', err)
})
