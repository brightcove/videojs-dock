'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var videojs = require('video.js');
var Component = videojs.getComponent('Component');
var assign = require('object.assign/polyfill')();

var Title = (function (_Component) {
  _inherits(Title, _Component);

  function Title(player, options) {
    _classCallCheck(this, Title);

    _get(Object.getPrototypeOf(Title.prototype), 'constructor', this).call(this, player, options);
    this.title = this.el_.querySelector('.vjs-dock-title');
    this.description = this.el_.querySelector('.vjs-dock-description');
  }

  _createClass(Title, [{
    key: 'createEl',
    value: function createEl() {
      return _get(Object.getPrototypeOf(Title.prototype), 'createEl', this).call(this, 'div', {
        className: 'vjs-dock-text',
        innerHTML: '\n        <h1 class=\'vjs-dock-title\'>' + this.options_.title + '</h1>\n        <h2 class=\'vjs-dock-description\'>' + (this.options_.description || '') + '</h2>\n      '
      });
    }
  }, {
    key: 'update',
    value: function update(title, description) {
      this.title.innerHTML = '';
      this.description.innerHTML = '';
      this.title.appendChild(document.createTextNode(title));
      this.description.appendChild(document.createTextNode(description));
    }
  }]);

  return Title;
})(Component);

exports.Title = Title;
;

var Shelf = (function (_Component2) {
  _inherits(Shelf, _Component2);

  function Shelf() {
    _classCallCheck(this, Shelf);

    _get(Object.getPrototypeOf(Shelf.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Shelf, [{
    key: 'createEl',
    value: function createEl() {
      return _get(Object.getPrototypeOf(Shelf.prototype), 'createEl', this).call(this, 'div', {
        className: 'vjs-dock-shelf'
      });
    }
  }]);

  return Shelf;
})(Component);

exports.Shelf = Shelf;
;

videojs.registerComponent('Title', Title);
videojs.registerComponent('Shelf', Shelf);

videojs.plugin('dock', function (options) {
  var player = this;
  var opts = options || {};
  var settings = assign({
    title: {
      title: '',
      description: ''
    }
  }, {
    title: {
      title: opts.title || '',
      description: opts.description || ''
    }
  });

  var title = player.title;
  var shelf = player.shelf;

  if (!title) {
    title = player.title = this.addChild('title', settings.title);
  } else {
    title.update(settings.title.title, settings.title.description);
  }
  if (!shelf) {
    shelf = player.shelf = this.addChild('shelf', settings);
  }
});