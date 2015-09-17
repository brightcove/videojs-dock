let videojs = require('video.js');
let Component = videojs.getComponent('Component');

export class Title extends Component {
  constructor(player, options) {
    super(player, options);
  }

  createEl() {
    return super.createEl('div', {
      className: 'vjs-dock-text',
      innerHTML: `
        <h1 class='vjs-dock-title'>${this.options_.title}</h1>
        <h2 class='vjs-dock-description'>${this.options_.description || ''}</h2>
      `
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
      title: options.title,
      description: options.description
    }
  };
  let dock = this.addChild('dock', settings);
});
