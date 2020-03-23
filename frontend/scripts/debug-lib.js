/**
 * Build library and copy to node_modules of specified project
 */
const execSync = require('child_process').execSync;
const ncp = require('ncp').ncp;
const rimraf = require('rimraf');

// ncp.limit = 16;

const libraries = ['smart-core'];

const libraryPrefix = '@xpo';
const sourceFolder = './dist';
const targetApp = process.argv[2];
const destFolder = `${targetApp}/node_modules/${libraryPrefix}`;

function main() {
  // clean build artifacts
  clean(sourceFolder);

  // build libraries
  libraries.forEach((lib) => {
    build(lib);
  });

  // clean destination
  libraries.forEach((lib) => {
    clean(`${destFolder}/${lib}`);
  });

  // copy libraries to destination
  libraries.reverse().forEach((lib) => {
    copy(`${sourceFolder}/${lib}`, `${destFolder}/${lib}`, {
      clobber: true,
    });
  });
}

///////////////////////////

function build(lib, options = '') {
  console.log(`Building ${lib}`);
  execSync(`ng build ${options} ${lib}`, {
    stdio: 'inherit',
  });
}

function errFn(err) {
  if (err) {
    return console.error(err);
  }
}

function clean(target) {
  // console.log(`Deleting ${target}`);
  // rimraf(`${target}/**/*`, (err) => {
  //   if (err) {
  //     errFn(err);
  //   }
  // });
}

function copy(source, dest) {
  console.log(`Copying: ${source} to ${dest}`);
  ncp(source, `${dest}`, errFn);
}

main();
