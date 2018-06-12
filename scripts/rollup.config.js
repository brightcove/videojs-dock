/**
 * Rollup configuration for packaging the plugin in various formats.
 */
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const json = require('rollup-plugin-json');
const multiEntry = require('rollup-plugin-multi-entry');
const resolve = require('rollup-plugin-node-resolve');
const {uglify} = require('rollup-plugin-uglify');
const {minify} = require('uglify-es');
const pkg = require('../package.json');
const banner = `/*! @name ${pkg.name} @version ${pkg.version} @license ${pkg.license} */`;

const plugins = {
  babel: babel({
    babelrc: false,
    exclude: 'node_modules/**',
    presets: [
      ['env', {loose: true, modules: false, targets: {browsers: pkg.browserslist}}]
    ],
    plugins: [
      'external-helpers',
      'transform-object-assign'
    ]
  }),
  commonjs: commonjs({sourceMap: false}),
  json: json(),
  multiEntry: multiEntry({exports: false}),
  resolve: resolve({browser: true, main: true, jsnext: true}),
  uglify: uglify({output: {comments: 'some'}}, minify)
};

// to prevent a screen during rollup watch/build
process.stderr.isTTY = false;

let isWatch = false;

process.argv.forEach((a) => {
  if ((/-w|--watch/).test(a)) {
    isWatch = true;
  }
});

const umdGlobals = {
  'video.js': 'videojs',
  'global': 'window',
  'global/window': 'window',
  'global/document': 'document'
};
const moduleGlobals = {
  'video.js': 'videojs'
};

const testGlobals = {
  'qunit': 'QUnit',
  'qunitjs': 'QUnit',
  'sinon': 'sinon',
  'video.js': 'videojs'
};

const testExternals = Object.keys(testGlobals).concat([
]);

const builds = [{
  // umd
  input: 'src/plugin.js',
  output: {
    name: 'videojsDock',
    file: 'dist/videojs-dock.js',
    format: 'umd',
    globals: umdGlobals,
    banner
  },
  external: Object.keys(umdGlobals),
  plugins: [
    plugins.resolve,
    plugins.json,
    plugins.commonjs,
    plugins.babel
  ]
}, {
  // cjs
  input: 'src/plugin.js',
  output: [{
    file: 'dist/videojs-dock.cjs.js',
    format: 'cjs',
    globals: moduleGlobals,
    banner
  }],
  external: Object.keys(moduleGlobals).concat([
    'global',
    'global/document',
    'global/window'
  ]),
  plugins: [
    plugins.resolve,
    plugins.json,
    plugins.commonjs,
    plugins.babel
  ]
}, {
  // es
  input: 'src/plugin.js',
  output: [{
    file: 'dist/videojs-dock.es.js',
    format: 'es',
    globals: moduleGlobals,
    banner
  }],
  external: Object.keys(moduleGlobals).concat([
    'global',
    'global/document',
    'global/window'
  ]),
  plugins: [
    plugins.resolve,
    plugins.json,
    plugins.commonjs
  ]
}, {
  // test bundle
  input: 'test/**/*.test.js',
  output: {
    name: 'videojsDockTests',
    file: 'test/dist/bundle.js',
    format: 'iife',
    globals: testGlobals
  },
  external: testExternals,
  plugins: [
    plugins.multiEntry,
    plugins.resolve,
    plugins.json,
    plugins.commonjs,
    plugins.babel
  ]
}];

if (!isWatch) {
  builds.push({
    // minified umd
    input: 'src/plugin.js',
    output: {
      name: 'videojsDock',
      file: 'dist/videojs-dock.min.js',
      format: 'umd',
      globals: umdGlobals,
      banner
    },
    external: Object.keys(umdGlobals),
    plugins: [
      plugins.resolve,
      plugins.json,
      plugins.commonjs,
      plugins.uglify,
      plugins.babel
    ]
  });
}

export default builds;
