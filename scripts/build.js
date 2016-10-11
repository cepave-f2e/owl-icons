import webpack from 'webpack'
import webpackConf from '../webpack.config'
import pkg from '../package.json'
import gu from 'gulp'
import size from 'gulp-size'
import fs from 'fs'
import c from 'chalk'

webpack(webpackConf, (err, stats)=> {
  console.log(stats.toString({
    colors: true
  }))

  gu.src('dist/**')
    .pipe(size({
      showFiles: true,
      gzip: true,
      prettySize: true,
    }))
    .on('finish', ()=> {
      pkg.version = pkg.version.replace(/-.*$/, `-${Date.now()}`)

      fs.writeFile('package.json', JSON.stringify(pkg, null, 2), (err)=> {
        console.log(`update version: ${c.yellow(pkg.version)}`)
      })
    })
})
