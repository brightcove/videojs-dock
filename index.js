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

videojs.registerComponent('Title', Title);
videojs.registerComponent('Shelf', Shelf);

videojs.plugin('dock', function(options) {
  let settings = {
    title: {
      title: options.title,
      description: options.description
    }
  };

  let title = player.title = this.addChild('title', settings.title);
  let shelf = player.shelf = this.addChild('shelf', settings);
});
