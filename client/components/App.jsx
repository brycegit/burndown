var React = require('react');
var Form = require('./Form.jsx');
var TasksList = require('./TasksList.jsx');
var Stats = require('./Stats.jsx');

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tasks: [],
      time: 0,
      budget: 0
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
    this.setState({ev: Math.floor(ev)});
    this.setState({pv: Math.floor(pv)})
    this.setState({vel: Math.floor((ev / pv) * 100)});
    this.setState({eff: Math.floor((((ev / totalWork) * 100) / this.state.budget) * 100)});
    this.setState({length: this.state.tasks.length});
  }

  updateData(){
    var that = this;
    $.get('/tasks', function(data) {
      that.setState({tasks: data});
    })
    .done(function(){
      that.updateStats();
    });

    $.get('/status', function(data) {
      that.setState({budget: data[0].budget, time: data[0].time});
    })
    .done(function(data){
      console.log('status data', data);
      that.updateStats();
    });
  }

  componentWillMount(){
    this.updateData();
  }

  taskClick(index){
    var task = this.state.tasks[index];
    dialog.showModal();
    $('.mdl-textfield').addClass('is-dirty');
    $('#name').val(task.name);
    // $("label[for='name']").val('asdf');
    $('#estimate').val(task.estimate);
    // $("label[for='estimate']").val('asdf');
    $('#percent').val(task.percent);
    $('#id').val(task._id);
    $('#taskFormTitle').text('Update Task');
  }

  render(){
    return (
      <div>
      <div id='admin'><a href="/statusform">Admin</a></div>
      <h1>Burn Down Generator</h1>
      <h4>Total time passed: {this.state.time}%</h4>
      <h4>Budget used: {this.state.budget}%</h4>
      <Form click={this.updateData.bind(this)} />
      <TasksList click={this.taskClick.bind(this)} tasks={this.state.tasks} />
      <Stats state = {this.state}/>
      </div>
    )
  }
}

module.exports = App;
