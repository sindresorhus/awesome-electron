const test = require('tape')
const awesomeElectron = require('./')
var sections = ['apps', 'boilerplates', 'tools', 'components']

test('awesomeElectron', function (t) {
  t.equal(typeof awesomeElectron, 'object', 'is an object')
  t.notOk(awesomeElectron.tips, 'does not have tips')
  t.notOk(awesomeElectron.contribute, 'does not have tips')
  t.notOk(awesomeElectron.license, 'does not have license')

  sections.forEach(section => {
    t.ok(Array.isArray(awesomeElectron.apps), `has an array of ${section}`)

    awesomeElectron[section].forEach(item => {
      t.ok(item.name.length, `${item.name} has a name`)
      t.ok(item.href.length, `${item.name} has an href`)
      t.ok(item.description.length, `${item.name} has a description`)
    })
  })

  t.end()
})
