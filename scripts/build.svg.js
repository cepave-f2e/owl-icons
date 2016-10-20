import gu from 'gulp'
import svgstore from 'gulp-svgstore'
import cheerio from 'gulp-cheerio'
import svgmin from 'gulp-svgmin'
import rename from 'gulp-rename'
import notify from 'gulp-notify'
import c from 'chalk'

gu.src('icons/*.svg')
  .pipe(notify((file)=> {
    console.log(`processing: ${c.cyan(file.relative)}`)
  }))
  .pipe(svgmin())
  .pipe(svgstore({
    inlineSvg: true,
  }))
  .pipe(cheerio(($)=> {
    $('svg')
      .css('display',  'none')
      .find('>defs').remove()

    $('symbol').each((index, el) => {
      const $el = $(el)
      let id = $el.attr('id')

      if (/^icon-/.test(id)) {
        id = id.replace(/^icon-/, '')
        $el.find('[fill]').removeAttr('fill')
      }

      $el
        .attr('id', `owl-icons-${id}`)
        .find('title').remove()
    })
  }))
  .pipe(rename('owl-ui.svg'))
  .pipe(gu.dest('dist'))
  .pipe(notify((file)=> {
    console.log(`outputs: ${c.cyan(file.path)}`)
  }))

