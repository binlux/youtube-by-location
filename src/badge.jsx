var React = require('react');

module.exports = React.createClass({
  handleClick: function(){
		alert('you clicked me and my value is ' + this.props.number);
  },
  render: function() {
    return <button onClick={this.handleClick} className="btn btn-primary" type="button">
      {this.props.title} <span className="badge">{this.props.number}</span>
    </button>
  }
});
