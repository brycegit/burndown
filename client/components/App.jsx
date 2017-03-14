var React = require('react');
var Form = require('./Form.jsx');
var TasksList = require('./TasksList.jsx');
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {tasks: [{week: 1, name: 'test', estimate: 'test', percent: 10}]}
  }

  componentWillMount(){
    var that = this;
    $.get('/tasks', function(data) {
      console.log('data from get', data)
    })
    .done(function(data) {
      that.setState({tasks: data});
    })
  }

  render(){
    return (
      <div>
      <h1>Burn Down Generator</h1>
      <Form />
      <TasksList tasks={this.state.tasks} />
      </div>
    )
  }
}

module.exports = App;
