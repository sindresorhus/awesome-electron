const fs = require('fs')
const path = require('path')
const ignoredCategories = ['table_of_contents', 'tips', 'contribute', 'license']
const headingPattern = /^## /
const subHeadingPattern = /^### /
const itemPattern = /^- \[(.*)\]\((.*)\)(.*)/
const slug = function slug(str) { return str.toLowerCase().replace(/ /g, '_')}

module.exports = function() {
  var awesome = []
  var category
  var subcategory

  fs.readFileSync(path.join(__dirname, 'readme.md'), 'utf8')
    .split('\n')
    .forEach(line => {

      if (line.match(headingPattern)) {
        var cat = slug(line.replace(headingPattern, ''))
        if (ignoredCategories.indexOf(cat) > -1) return
        category = cat
        subcategory = null
        return
      }

      if (line.match(subHeadingPattern)) {
        subcategory = slug(line.replace(subHeadingPattern, ''))
        return
      }

      var itemParts = line.match(itemPattern)
      if (itemParts) {
        var item = {
          name: itemParts[1],
          href: itemParts[2],
        }
        if (itemParts[3]) {
          item.description = itemParts[3].replace(/^ - /, '')
        }
        item.category = category
        if (subcategory) { item.subcategory = subcategory}
        awesome.push(item)
      }
    })

  return awesome
}
