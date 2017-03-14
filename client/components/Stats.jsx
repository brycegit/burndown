var React = require('react');

var Stats = ({state}) => (

  <div className={state.tasks.length > 0 && state.time > 1 ? 'show stats' : 'hide'} >
  <h4>Stats:</h4>
    <p className={state.vel < 80 ? 'red' : 'green'}><strong>Velocity:</strong> {state.vel}%</p>
    <p className={state.eff < 80 ? 'red' : 'green'}><strong>Efficiency:</strong> {state.eff}%</p>
    <p><strong>Work Completed:</strong> {state.ev} Hours</p>
    <p><strong>Planned Work Completed:</strong> {state.pv} Hours</p>
  </div>

)

module.exports = Stats;
