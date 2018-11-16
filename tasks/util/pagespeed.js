import process from 'process'
import gulp from 'gulp'
import psi, { output } from 'psi'
import fs from 'fs'
require('dotenv').config()

// site url
const URL = process.env.LIVE_HOST

gulp.task('mobile', done =>
  output(URL, {
    // key: key
    nokey: 'true',
    threshold: 20,
    // By default we use the PageSpeed Insights free (no API key) tier.
    // Use a Google Developer API key if you have one: http://goo.gl/RkN0vE
    // key: 'YOUR_API_KEY'
    strategy: 'mobile'
  }, done)

)

gulp.task('desktop', done =>
  output(URL, {
    // key: key
    nokey: 'true',
    threshold: 20,
    // By default we use the PageSpeed Insights free (no API key) tier.
    // Use a Google Developer API key if you have one: http://goo.gl/RkN0vE
    // key: 'YOUR_API_KEY'
    strategy: 'desktop'
  }, done)

)

export function savePsiReport(done) {
  psi(URL, {
    nokey: 'true',
    threshold: 20,
    strategy: 'mobile'
  }).then(data => {
    var time = Date.now()
    fs.writeFile(`./${time}mobile.json`, JSON.stringify([data.ruleGroups, data.pageStats]), function(err) {
      if (err) {
        return console.log(err)
      }
    })
  })

  psi(URL, {
    nokey: 'true',
    threshold: 20,
    strategy: 'desktop'
  }).then(data => {
    var time = Date.now()
    fs.writeFile(`./${time}desktop.json`, JSON.stringify([data.ruleGroups, data.pageStats]), function(err) {
      if (err) {
        return console.log(err)
      }
    })
  })
  done()
}
