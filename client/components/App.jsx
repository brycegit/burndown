var React = require('react');
var Form = require('./Form.jsx');

class App extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <Form/>
    )
  }
}

module.exports = App;
