const fs = require('fs')
const { replaceTscAliasPaths } = require('tsc-alias')

const writeFile = (path, data) => {
  fs.writeFile(path, JSON.stringify(data), err => {
    if (err) throw err
  })
}

function postBuild(dirpath) {
  writeFile(`${dirpath}/dist/package.json`, {
    type: 'module',
  })

  replaceTscAliasPaths({
    tsconfigPath: `${dirpath}/tsconfig.json`,
    outDir: `${dirpath}/dist/types`,
  })
}

postBuild(__dirname)
