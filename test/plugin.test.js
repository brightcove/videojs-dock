import document from 'global/document';

import QUnit from 'qunit';
import sinon from 'sinon';
import videojs from 'video.js';

import plugin from '../src/plugin';

const Player = videojs.getComponent('Player');

QUnit.test('the environment is sane', function(assert) {
  assert.strictEqual(typeof Array.isArray, 'function', 'es5 exists');
  assert.strictEqual(typeof sinon, 'object', 'sinon exists');
  assert.strictEqual(typeof videojs, 'function', 'videojs exists');
  assert.strictEqual(typeof plugin, 'function', 'plugin is a function');
});

QUnit.module('videojs-dock', {

  beforeEach() {
    this.fixture = document.getElementById('qunit-fixture');
    this.video = document.createElement('video');
    this.fixture.appendChild(this.video);
    this.player = videojs(this.video);

    // Mock the environment's timers because certain things - particularly
    // player readiness - are asynchronous in video.js 5.
    this.clock = sinon.useFakeTimers();
  },

  afterEach() {

    // The clock _must_ be restored before disposing the player; otherwise,
    // certain timeout listeners that happen inside video.js may throw errors.
    this.clock.restore();
    this.player.dispose();
  }
});

QUnit.test('registers itself with video.js', function(assert) {
  assert.expect(2);

  assert.strictEqual(
    typeof Player.prototype.dock,
    'function',
    'videojs-dock plugin was registered'
  );

  this.player.dock();

  // Tick the clock forward enough to trigger the player to be "ready".
  this.clock.tick(1);

  assert.ok(
    this.player.hasClass('vjs-dock'),
    'the plugin adds a class to the player'
  );
});

QUnit.test('adds aria attributes to the player when both title and description values are present in options', function(assert) {
  assert.expect(2);

  this.player.dock({
    title: 'Test Title',
    description: 'Test description.'
  });

  // Tick the clock forward enough to trigger the player to be "ready".
  this.clock.tick(1);

  const titleId = this.player.title.title.id;
  const descriptionId = this.player.title.description.id;

  assert.ok(
    this.player.getAttribute('aria-labelledby').includes(titleId),
    'the plugin adds an aria-labelledby to the player based on title ID'
  );

  assert.ok(
    this.player.getAttribute('aria-describedby').includes(descriptionId),
    'the plugin adds an aria-describedby to the player based on description ID'
  );
});

QUnit.test('adds aria-labelledby attribute to the player when only title is passed through options', function(assert) {
  assert.expect(2);

  this.player.dock({
    title: 'Test Title'
  });

  // Tick the clock forward enough to trigger the player to be "ready".
  this.clock.tick(1);

  const titleId = this.player.title.title.id;

  assert.ok(
    this.player.getAttribute('aria-labelledby').includes(titleId),
    'the plugin adds an aria-labelledby to the player based on title ID'
  );

  assert.ok(
    this.player.getAttribute('aria-describedby') === null,
    'the plugin does not add an empty aria-describedby to the player if description text is ""'
  );
});

QUnit.test('adds aria-describedby attribute to the player when only description is passed through options', function(assert) {
  assert.expect(2);

  this.player.dock({
    description: 'Test description.'
  });

  // Tick the clock forward enough to trigger the player to be "ready".
  this.clock.tick(1);

  const descriptionId = this.player.title.description.id;

  assert.ok(
    this.player.getAttribute('aria-describedby').includes(descriptionId),
    'the plugin adds an aria-describedby to the player based on description ID'
  );

  assert.ok(
    this.player.getAttribute('aria-labelledby') === null,
    'the plugin does not add an empty aria-labelledby to the player if title text is ""'
  );
});
