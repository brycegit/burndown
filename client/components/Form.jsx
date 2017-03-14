var React = require('react');

var Form = ({click}) => (

  <div>
  <button type="button" className="mdl-button show-modal mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
    <i className="material-icons">add</i>
  </button>
  <dialog className="mdl-dialog">
  <div className="mdl-dialog__content">
  <h3 id="taskFormTitle">Add Task</h3>
  <form id="taskForm" action="#">
    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
      <label className="mdl-textfield__label" htmlFor="name">Task Name</label>
      <input className="mdl-textfield__input" type="text" id="name" />
    </div>
    <br/>
    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
      <label className="mdl-textfield__label" htmlFor="estimate">Estimated Hours to Complete</label>
      <input className="mdl-textfield__input" type="text" id="estimate" />
    </div>
    <br/>
    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
      <label className="mdl-textfield__label" htmlFor="percent">% Complete</label>
      <input className="mdl-textfield__input" type="text" id="percent" />
    </div>
    <div className="hide mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
      <label className="mdl-textfield__label" htmlFor="id"></label>
      <input className="mdl-textfield__input" type="text" id="id" />
    </div>
    <button onClick={click} id="submit" className="close mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
      Add
    </button>
    <button id="close">
      X Close
    </button>
  </form>

  </div>
  </dialog>

  </div>
)

module.exports = Form;
