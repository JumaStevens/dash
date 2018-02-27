// const glob = require('glob');
// const camelCase = require('camelcase');
//
//
// const files = glob.sync('./**/*.f.js', { cwd: __dirname, ignore: './node_modules/**' })
//
// files.forEach(file => {
//
//   const only = process.env.FUNCTION_NAME;
//   const name = camelCase(file.slice(0, -5).split('/').join('_'));
//
//   if (only === undefined || only === name) {
//     exports[name] = require(file);
//   }
//
// });
