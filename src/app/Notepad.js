var View           = require('famous/core/View');
var Surface        = require('famous/core/Surface');
var Transform      = require('famous/core/Transform');
var Modifier       = require('famous/core/Modifier');
var Transitionable = require('famous/transitions/Transitionable');
var ViewGraph      = require('./ViewGraph');

var QuillSurface = require('./QuillSurface');

function Notepad() {
    View.apply(this, arguments);

    this._id;
    this._quill;

    //has a notion of size which reflects the content

    //has a quillsurface
    this._initQuillSurface();

    //has buttons
}

Notepad.prototype = Object.create(View.prototype);
Notepad.prototype.constructor = Notepad;

Notepad.DEFAULT_OPTIONS = {};

/* PRIVATE */

// Notepad.prototype._createGraph = function _createGraph() {

// }

Notepad.prototype._initQuillSurface = function _initQuillSurface() {
  this._quill = new QuillSurface();
  this._quill.pipe(this._eventInput)
}

module.exports = Notepad;
