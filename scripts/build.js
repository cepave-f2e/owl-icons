import webpack from 'webpack'
import webpackConf from '../webpack.config'
import gu from 'gulp'
import size from 'gulp-size'

webpack(webpackConf, (err, stats)=> {
  console.log(stats.toString({
    colors: true
  }))

  gu.src('package.json')
    .pipe(gu.dest('deploy'))

  gu.src('deploy/**')
    .pipe(size({
      showFiles: true,
      gzip: true,
      prettySize: true,
    }))
})
