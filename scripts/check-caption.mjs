const url = 'https://www.bistroindenkoning.com/foto-s?pgid=jtefkht7-2bcc9358-757a-496a-bd41-23e2a7de8555'
const html = await fetch(url).then((r) => r.text())
console.log('has Gekookte:', html.includes('Gekookte'))
const idx = html.indexOf('Gekookte')
if (idx > -1) console.log(html.slice(idx - 100, idx + 100))
const jsonMatches = [...html.matchAll(/"description":"([^"]{3,100})"/g)].slice(0, 20)
console.log('descriptions', jsonMatches.map((m) => m[1]))
