var View           = require('famous/core/View');
var Surface        = require('famous/core/Surface');
var Transform      = require('famous/core/Transform');
var Modifier       = require('famous/core/Modifier');
var Transitionable = require('famous/transitions/Transitionable');
var ViewGraph      = require('./ViewGraph');
var HeaderFooterLayout = require("famous/views/HeaderFooterLayout");

var QuillSurface = require('./QuillSurface');

function Notepad() {
    View.apply(this, arguments);

    this._id;
    this._quill;

    this.layout = new HeaderFooterLayout({
    	headerSize: 10,
    	footerSize: 0,
    });
    this._rootModifier = new Modifier({
    	origin: [0.5, 0.5],
    	align : [0.5, 0.5]
    })
    this.add(this._rootModifier).add(this.layout);
    //has a notion of size which reflects the content

    //has a quillsurface
    this._initQuillSurface();

    //has buttons
    this._initButtons();
}

Notepad.prototype = Object.create(View.prototype);
Notepad.prototype.constructor = Notepad;

Notepad.DEFAULT_OPTIONS = {};

/* PRIVATE */

// Notepad.prototype._createGraph = function _createGraph() {

// }

Notepad.prototype._initQuillSurface = function _initQuillSurface() {
  this._quill = new QuillSurface({
  	id : this.options.id,
  	size : this.options.size,
  	text : this.options.text,
  	properties : this.options.properties
  });
  this._quill.pipe(this._eventInput)
  this.layout.content.add(this._quill);
}

Notepad.prototype._initButtons = function _initButtons() {
	var plus = new Surface({
		size : [30, 20], 
		content : 'add',
		properties : {
			'-webkit-box-shadow' : '0px 0px 2px 2px rgba(0, 0, 0, 1)',
			'text-align' : 'center'
		}
	});
	this.layout.header.add(plus);
	plus.on('click', function() {
		alert(JSON.stringify(this.options));
	}.bind(this));
}

module.exports = Notepad;
