var React = require('react');

var TasksList = ({tasks}) => (
  // {tasks.map((task, i )=> <div key={i}>{task.name}</div>)}

  <table className="mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp">
    <thead>
      <tr>
        <th className="mdl-data-table__cell--non-numeric">Task</th>
        <th>Minutes to Complete</th>
      </tr>
    </thead>
    <tbody>
      {tasks.map((task, i )=> (<tr key={i}>
            <td className="mdl-data-table__cell--non-numeric">{task.name}</td>
            <td>{task.estimate}</td>
        </tr>))}
    </tbody>
  </table>
)

module.exports = TasksList;
