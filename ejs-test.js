const ejs = require('ejs')
const fs = require('fs')

const html = fs.readFileSync('templates/youtube.html', 'utf-8')
const data = {
    policy: {
        checklist: 'Some checklist',
        video: '0_Pn5puYb0o'
    }
}

const template = ejs.compile(html)
const result = ejs.render(template, data)

console.log(result)
