const { version, repository } = require('../package.json')
require('shelljs/global')

const { TRAVIS_BRANCH, TRAVIS_MATRIX, TRAVIS_PULL_REQUEST_BRANCH,
  GH_TOKEN, NPM_PASSWD } = process.env

const tokenRepo = repository.replace(/(github.com)/, `${GH_TOKEN}@$1`)
const tag = `v${version}`

console.log({ TRAVIS_BRANCH, TRAVIS_MATRIX, TRAVIS_PULL_REQUEST_BRANCH })

if (TRAVIS_MATRIX === 'test') {
  exec('curl -s https://codecov.io/bash | bash')
}

if (TRAVIS_BRANCH === 'master' && TRAVIS_MATRIX === 'build') {
  exec(`git config --global user.email "auto_deploy@circleci.com"`)
  exec(`git config --global user.name "CircleCI"`)

  // Add GH Tag
  exec(`git tag ${tag}`)
  exec(`git push ${tokenRepo} ${tag}`, {
    silent: true,
  })

  // Publish to NPM
  exec(`echo -e "cepave\n${NPM_PASSWD}\nrwu@cepave.com" | npm login`)
  exec(`npm publish ./deploy --access=public`)
}
