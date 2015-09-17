let videojs = require('video.js');
let Component = videojs.getComponent('Component');

export class Title extends Component {
  constructor(player, options) {
    super(player, options);
  }

  createEl() {
    return super.createEl('h1', {
      className: 'vjs-dock-title',
      innerHTML: this.options_.title
    });
  }
};

export class Shelf extends Component {
  createEl() {
    return super.createEl('div', {
      className: 'vjs-dock-shelf'
    });
  }
};


export class Dock extends Component {
  constructor(player, options) {
    super(player, options);
  }

  createEl() {
    return super.createEl('div', {
      className: 'vjs-dock'
    });
  }

};


Dock.prototype.options_ = {
  children: [
    'title',
    'shelf'
  ]
};

videojs.registerComponent('Title', Title);
videojs.registerComponent('Shelf', Shelf);
videojs.registerComponent('Dock', Dock);

videojs.plugin('dock', function(options) {
  let settings = {
    title: {
      title: options.title
    }
  };
  let dock = this.addChild('dock', settings);
});
