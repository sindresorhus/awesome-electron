const path = require('path')
const marky = require('marky-markdown-lite')
const ignoredCategories = ['table_of_contents', 'tips', 'contribute', 'license']
const $ = marky(path.join(__dirname, 'readme.md'))
var awesome = {}

$('h2').each(function () {
  var category = $(this).text().toLowerCase().replace(/ /g, '_')
  if (ignoredCategories.indexOf(category) > -1) return
  awesome[category] = []
  $(this).nextUntil('h2').each(function () {
    if ($(this)[0].name === 'ul') {
      $(this).find('li').each(function () {
        var item = {
          name: $(this).find('a').text(),
          href: $(this).find('a').attr('href'),
        }
        var description = $(this).html().match(/ - (.*)/)
        if (description) item.description = description[1]
        awesome[category].push(item)
      })
    }
  })
})

process.stdout.write(JSON.stringify(awesome, null, 2))
