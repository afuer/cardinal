'use strict';
/*jshint asi: true*/

var test     =  require('tap').test
  , path     =  require('path')
  , fs       =  require('fs')
  , settings =  require('../settings')
  , hideSemicolonsTheme =  require('../themes/hide-semicolons')
  , home                =  path.join(__dirname, 'fixtures', 'home')
  , rcpath              =  path.join(home, '.cardinalrc')

function writerc(config) {
  fs.writeFileSync(rcpath, JSON.stringify(config), 'utf-8')
}

function removerc () {
  fs.unlinkSync(rcpath)
}

function resolveTheme (config) {
  writerc(config)
  var result = settings.resolveTheme(home)
  removerc()
  return result;
}

// Get all results synchronously to avoid tests from interfering with each other

var norcTheme  =  settings.resolveTheme(home)
  , namedTheme =  resolveTheme({ theme: "hide-semicolons" })
  , pathTheme  =  resolveTheme({ theme: path.join(__dirname, '..', 'themes', 'hide-semicolons.js') })

test('no .cardinalrc in home', function (t) {
  t.equals(norcTheme, undefined, 'resolves no theme') 
  t.end()
})

test('.cardinalrc with theme "hide-semicolons" in home', function (t) {
  t.deepEquals(namedTheme, hideSemicolonsTheme, 'resolves hide-semicolons theme') 
  t.end()
})

test('.cardinalrc with full path to "hide-semicolons.js" in home', function (t) {
  t.deepEquals(pathTheme, hideSemicolonsTheme, 'resolves hide-semicolons theme') 
  t.end()
})
