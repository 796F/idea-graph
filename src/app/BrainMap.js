var View           = require('famous/core/View');
var Surface        = require('famous/core/Surface');
var Transform      = require('famous/core/Transform');
var Modifier       = require('famous/core/Modifier');
var Transitionable = require('famous/transitions/Transitionable');
var ViewGraph      = require('./ViewGraph');

var DataConnector = require('./DataConnector');
var Notepad = require('./Notepad');

function BrainMap() {
    View.apply(this, arguments);

    this._rootModifier = new Modifier({
      origin : [0.5, 0.5],
      align : [0.5, 0.5]
    });
    this._rootNode = this.add(this._rootModifier);

    this._createGraph();
}

BrainMap.prototype = Object.create(View.prototype);
BrainMap.prototype.constructor = BrainMap;

BrainMap.DEFAULT_OPTIONS = {};

/* PRIVATE */

BrainMap.prototype._createGraph = function _createGraph() {
  this._graph = new ViewGraph()
  this._data = DataConnector.get();

  for(var i=0; i<this._data.notes.length; i++) {
    var noteData = this._data.notes[i];
    var notepad = new Notepad({
      id : noteData.id,
      text : noteData.text,
      size : [100, 100],
      properties : {
        'border-radius' : '50%',
        '-webkit-box-shadow' : '0px 0px 1px 1px black'
      }
    });
    this._graph.addView(noteData.id, notepad);
  }

  for(var i=0; i<this._data.links.length; i++) {
    var link = this._data.links[i];
    this._graph.addLink(link.parent, link.child);
  }

  this._rootNode.add(this._graph);
}

module.exports = BrainMap;
  
