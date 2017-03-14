var React = require('react');
var Form = require('./Form.jsx');
var TasksList = require('./TasksList.jsx');
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tasks: [{name: 'This is the name of an important task', estimate: 10, percent: 50}],
      time: 100,
      budget: 80,
      ev: 0
    }
  }

  updateStats() {
    var ev = this.state.tasks.reduce((acc, task) => {
      return acc + (task.estimate * (task.percent/100));
    }, 0);
    var totalWork = this.state.tasks.reduce((acc, task) => {
      return acc + task.estimate;
    }, 0);
    this.setState({tw: totalWork});
    var pv = totalWork * (this.state.time/100);
    this.setState({ev: ev});
    this.setState({pv: pv})
    this.setState({vel: Math.floor((ev / pv) * 100)});
    this.setState({eff: Math.floor((((ev / totalWork) * 100) / this.state.budget) * 100)});
  }

  updateData(){
    var that = this;
    $.get('/tasks', function(data) {
      that.setState({tasks: data});
    })
    .done(function(){
      that.updateStats();
    });
  }


  componentWillMount(){
    this.updateData();
  }

  render(){
    return (
      <div>
      <h1>Burn Down Generator</h1>
      <h4>Total time passed: {this.state.time}%</h4>
      <h4>Budget used: {this.state.budget}%</h4>
      <Form click={this.updateData.bind(this)} />
      <TasksList tasks={this.state.tasks} />
      <h4>Stats:</h4>
      <p className={this.state.vel < 80 ? 'red' : 'green'}><strong>Velocity:</strong> {this.state.vel}%</p>
      <p className={this.state.eff < 80 ? 'red' : 'green'}><strong>Efficiency:</strong> {this.state.eff}%</p>
      <p><strong>Work Completed:</strong> {this.state.ev} Hours</p>
      <p><strong>Planned Work Completed:</strong> {this.state.pv} Hours</p>
      </div>
    )
  }
}

module.exports = App;
