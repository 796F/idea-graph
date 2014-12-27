var View           = require('famous/core/View');
var Surface        = require('famous/core/Surface');
var Transform      = require('famous/core/Transform');
var Modifier       = require('famous/core/Modifier');
var Transitionable = require('famous/transitions/Transitionable');

var RepulsionForce = require('famous/physics/forces/Repulsion');
var Circle         = require('famous/physics/bodies/Circle');
var Vector         = require('famous/math/Vector');
var PhysicsEngine  = require('famous/physics/PhysicsEngine');
var Collision      = require('famous/physics/constraints/Collision');
var Drag           = require('famous/physics/forces/Drag');
var Particle       = require('famous/physics/bodies/Particle');
var Spring         = require('famous/physics/forces/Spring');
var VectorField    = require('famous/physics/forces/VectorField');

function ViewGraph() {
    View.apply(this, arguments);

    this._viewMap = {};   //maps a viewId to view and physics body
    this._bodies = [];    //array of physics bodies used for collision.

    this._PE;
    this._collisionForce;
    this._interNodalForce;
    this._drag;
    this._anchor;

    this._initPhysics();
}

ViewGraph.prototype = Object.create(View.prototype);
ViewGraph.prototype.constructor = ViewGraph;

ViewGraph.DEFAULT_OPTIONS = {};

ViewGraph.prototype.addView = function addView(viewId, view) {
  // var viewId = Object.keys(this._viewMap).length;
  var pair = this._createBodyModifierPair();
  
  this.add(pair.modifier).add(view);

  this._viewMap[viewId] = { view : view, body : pair.body };
  this._bodies.push(pair.body);

  this._PE.addBody(pair.body);                                //add body to PE
  this._PE.attach(this._repulsion, this._bodies, pair.body);  //all bodies repel eachother
  
  // this._PE.attach(this._gravity, pair.body);
  // this._PE.attach(this._drag, pair.body);  //drag breaks springs? 
  
  return viewId;
}


ViewGraph.prototype.addLink = function addLink(parentId, childId) {
  var child = this._viewMap[childId];

  var anchoringBody;
  if(parentId) {
    anchoringBody = this._viewMap[parentId].body;
  }else{
    anchoringBody = this._anchor;
  }
  this._PE.attach(this._spring, child.body, anchoringBody);
}

/* PRIVATE */

ViewGraph.prototype._initPhysics = function _initPhysics() {
  this._PE = new PhysicsEngine();

  //all nodes repel eachother 
  this._repulsion = new RepulsionForce({
    strength: 10
  });

  //spring between each parent and child relationship
  this._spring = new Spring({
      length: 100,
      dampingRatio: 1,
      period : 800
  });

  this._anchor = new Particle({
    position : new Vector(0, 0, 0)
  });

  this._gravity = new VectorField({
      field: VectorField.FIELDS.CONSTANT,
      strength: 0.0005
  });

  this._drag = new Drag({
    strength: -0.01
  });
}

ViewGraph.prototype._createBodyModifierPair = function _createBodyModifierPair() {
  var circle = new Circle({
    radius : 30,
    position : _randomVector()
  });

  var modifier = new Modifier({
    transform : function () {
      return circle.getTransform();
    }
  });

  return {
    modifier : modifier,
    body : circle
  };
}

function _randomVector() {
  return new Vector((0.5 - Math.random()) * 100, (0.5 - Math.random()) * 100, 0);
}

module.exports = ViewGraph;
  
