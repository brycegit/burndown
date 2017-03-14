var React = require('react');

var Form = () => (

  <div>
  <button type="button" className="mdl-button show-modal mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
    <i className="material-icons">add</i>
  </button>
  <dialog className="mdl-dialog">
  <div className="mdl-dialog__content">
  <h3>Add Task</h3>
  <form action="#">
    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
      <label className="mdl-textfield__label" htmlFor="name">Task Name</label>
      <input className="mdl-textfield__input" type="text" id="name" />
    </div>
    <br/>
    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
      <label className="mdl-textfield__label" htmlFor="estimate">Estimated Hours</label>
      <input className="mdl-textfield__input" type="text" id="estimate" />
    </div>
    <br/>
    <button id="submit" className="close mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
      Add
    </button>
    <button id="close" className="close">
      X Close
    </button>
  </form>

  </div>
  </dialog>

  </div>
)

module.exports = Form;
