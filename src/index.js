var Engine = require('famous/core/Engine');
var BrainMap = require('./app/BrainMap');

// load css
require('./styles');
// Load polyfills
require('famous-polyfills');

// create the main context
var mainContext = Engine.createContext();
var graph = new BrainMap();

mainContext.setPerspective(1000);
mainContext.add(graph);
