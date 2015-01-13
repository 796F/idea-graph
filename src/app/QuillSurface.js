var Surface = require('famous/core/Surface');

function QuillSurface(options) {
  Surface.apply(this, arguments);
  
  this._editor;
  this._id;

  if (options) this.setOptions(options);
  
  _initQuill.call(this);

  this.on('deploy', _configureQuill.bind(this));
}

QuillSurface.prototype = Object.create(Surface.prototype);
QuillSurface.prototype.constructor = QuillSurface;

QuillSurface.DEFAULT_OPTIONS = {};

// QuillSurface.prototype. = function () {
// }

QuillSurface.prototype.setOptions = function setOptions(options) {
  if (options.size) this.setSize(options.size);
  if (options.classes) this.setClasses(options.classes);
  if (options.properties) this.setProperties(options.properties);
  if (options.attributes) this.setAttributes(options.attributes);
  if (options.id) this._id = options.id;
  if (options.text) this._text = options.text;
  return this;
};

function _configureQuill() {
  this._editor = new Quill('#' + this._id);
  // this._editor.addModule('toolbar', { container: '#toolbar' });

  this._initEvents();
  this._eventOutput.emit('initDone');
  this.setEditorContent(this._text);
  // Engine.nextTick( _editorCommands.bind(this) );
}

QuillSurface.prototype.setEditorContent = function setEditorContent(content) {
  this._editor.setText(content);
}

function _initQuill() {
  // var content = '<div id="toolbar">' + 
  //               '<button class="ql-bold">Bold</button>' + 
  //               '<button class="ql-italic">Italic</button></div>' +
  var content = '<div style="width: 100%; height: 100%; pointer-events: all;" id="' + this._id + '"></div>';
  this.setContent(content);
}

QuillSurface.prototype._initEvents = function _initEvents() {
  this._editor.on('text-change', function(delta, source) {
    this._eventOutput.emit('text-change', delta, source);
    if (source == 'api') {
      console.log("An API call triggered this change.");
    } else if (source == 'user') {
      console.log("A user action triggered this change.");
    }
  }.bind(this));

  this._editor.on('selection-change', function(range) {
    this._eventOutput.emit('selection-change', range);
    if (range) {
      if (range.start == range.end) {
        console.log('User cursor is on', range.start);
      } else {
        var text = this._editor.getText(range.start, range.end);
        console.log('User has highlighted', text);
      }
    } else {
      console.log('Cursor not in the editor');
    }
  }.bind(this));
}

module.exports = QuillSurface;
