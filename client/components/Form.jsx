var React = require('react');

var Form = () => (
  <form action="#">
    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
      <label className="mdl-textfield__label" htmlFor="week">Week</label>
      <input className="mdl-textfield__input" type="text" id="week" />
    </div>
    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
      <label className="mdl-textfield__label" htmlFor="name">Task Name</label>
      <input className="mdl-textfield__input" type="text" id="name" />
    </div>
    <br/>
    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
      <label className="mdl-textfield__label" htmlFor="estimate">Estimated Hours</label>
      <input className="mdl-textfield__input" type="text" id="estimate" />
    </div>
    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
      <label className="mdl-textfield__label" htmlFor="percent">Percent Complete</label>
      <input className="mdl-textfield__input" type="text" id="percent" />
    </div>
    <br/>
    <button id="submit" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
      Add
    </button>
  </form>
)

module.exports = Form;
