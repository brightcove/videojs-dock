import videojs from 'video.js';

let Component = videojs.getComponent('Component');

/**
 * Title Component
 */
export class Title extends Component {
  constructor(player, options) {
    super(player, options);
    this.title = this.el_.querySelector('.vjs-dock-title');
    this.description = this.el_.querySelector('.vjs-dock-description');
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

  update(title, description) {
    this.title.innerHTML = '';
    this.description.innerHTML = '';
    this.title.appendChild(document.createTextNode(title));
    this.description.appendChild(document.createTextNode(description));
  }
}

/**
 * Shelf Component
 */
export class Shelf extends Component {
  createEl() {
    return super.createEl('div', {
      className: 'vjs-dock-shelf'
    });
  }
}

videojs.registerComponent('Title', Title);
videojs.registerComponent('Shelf', Shelf);

/**
 * A video.js plugin.
 *
 * In the plugin function, the value of `this` is a video.js `Player`
 * instance. You cannot rely on the player being in a "ready" state here,
 * depending on how the plugin is invoked. This may or may not be important
 * to you; if not, remove the wait for "ready"!
 *
 * @function dock
 * @param    {Object} [options={}]
 *           An object of options left to the plugin author to define.
 */
const dock = function(options) {
  let opts = options || {};
  let settings = {
    title: {
      title: opts.title || '',
      description: opts.description || ''
    }
  };

  let title = this.title;
  let shelf = this.shelf;

  this.addClass('vjs-dock');

  if (!title) {
    title = this.title = this.addChild('title', settings.title);
  } else {
    title.update(settings.title.title, settings.title.description);
  }
  if (!shelf) {
    shelf = this.shelf = this.addChild('shelf', settings);
  }

  this.one(title, 'dispose', function() {
    this.title = null;
  });

  this.one(shelf, 'dispose', function() {
    this.shelf = null;
  });
};

// Register the plugin with video.js.
videojs.plugin('dock', dock);

export default dock;
