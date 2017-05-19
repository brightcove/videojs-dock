import document from 'global/document';
import videojs from 'video.js';
import guid from './guid.js';

const dom = videojs.dom || videojs;
const registerPlugin = videojs.registerPlugin || videojs.plugin;
const Component = videojs.getComponent('Component');

/**
 * Title Component
 */
export class Title extends Component {
  constructor(player, options) {
    super(player, options);

    const tech = player.$('.vjs-tech');

    tech.setAttribute('aria-labelledby', this.title.id);
    tech.setAttribute('aria-describedby', this.description.id);
  }

  createEl() {
    const title = dom.createEl('div', {
      className: 'vjs-dock-title',
      title: this.options_.title,
      innerHTML: this.options_.title
    }, {
      id: `vjs-dock-title-${guid()}`
    });
    const desc = dom.createEl('div', {
      className: 'vjs-dock-description',
      title: this.options_.description,
      innerHTML: this.options_.description
    }, {
      id: `vjs-dock-description-${guid()}`
    });
    const el = super.createEl('div', {
      className: 'vjs-dock-text'
    });

    this.title = title;
    this.description = desc;

    el.appendChild(title);
    el.appendChild(desc);
    return el;
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
  const opts = options || {};
  const settings = {
    title: {
      title: opts.title || '',
      description: opts.description || ''
    }
  };

  let title = this.title;
  let shelf = this.shelf;

  this.addClass('vjs-dock');

  const bpbIndex = this.children().indexOf(this.getChild('bigPlayButton'));
  const index = bpbIndex > 0 ? bpbIndex - 1 : null;

  // add shelf first so `title` is added before it if available
  // because shelf will now be at index
  if (!shelf) {
    shelf = this.shelf = this.addChild('shelf', settings, index);
  }

  if (!title) {
    title = this.title = this.addChild('title', settings.title, index);
  } else {
    title.update(settings.title.title, settings.title.description);
  }

  this.one(title, 'dispose', function() {
    this.title = null;
  });

  this.one(shelf, 'dispose', function() {
    this.shelf = null;
  });
};

// Register the plugin with video.js.
registerPlugin('dock', dock);

export default dock;
