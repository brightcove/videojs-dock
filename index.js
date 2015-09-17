let videojs = require('video.js');
let Component = videojs.getComponent('Component');

export class Dock extends Component {
  constructor(player, options) {
    super(player, options);
    console.log(this.options_);
  }

  createEl() {
    return super.createEl('div', {
      className: 'vjs-dock',
      innerHTML: `
        <h1 class='vjs-dock-title'>${this.options_.title}</h1>
      `
    });
  }
};

videojs.registerComponent('Dock', Dock);

videojs.plugin('dock', function(options) {
  this.addChild('dock', options);
});
