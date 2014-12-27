DataConnector = {};

DataConnector.get = function () {
  return {
    notes : [
      { id : 'note1', text : 'this is inside note1, bulbasaur' },
      { id : 'note2', text : 'this is inside note2, venasaur' },
      { id : 'note3', text : 'this is inside note3, ivysaur' },
      { id : 'note4', text : 'this is inside note4' },
      { id : 'note5', text : 'this is inside note5' },
      { id : 'note6', text : 'this is inside note6' },
      { id : 'note7', text : 'this is inside note7' },
      { id : 'note8', text : 'this is inside note8' },
      { id : 'note9', text : 'this is inside note4' },
      { id : 'note10', text : 'this is inside note10' },
      { id : 'note11', text : 'this is inside note11' },
      { id : 'note12', text : 'this is inside note12' },
      { id : 'note13', text : 'this is inside note13' }
    ],
    links : [
      { parent : 'note2', child : 'note3' },
      { parent : 'note3', child : 'note1' },
      { parent : 'note1', child : 'note4' },
      { parent : undefined, child : 'note2'},
      { parent : undefined, child : 'note5'},
      { parent : undefined, child : 'note6'},
      { parent : undefined, child : 'note7'},
      { parent : undefined, child : 'note9'},
      { parent : 'note3', child : 'note8'},
      { parent : 'note8', child : 'note10'},
      { parent : 'note6', child : 'note11'},
      { parent : 'note6', child : 'note12'},
      { parent : 'note12', child : 'note13'}
    ]
  }
}

module.exports = DataConnector
