var React = require('react');
var ReactDOM = require('react-dom');
var CountrySearch = require('./country-search');

var App = React.createClass({
    render: function () {
        return (
            <div>
                <CountrySearch />
            </div>
        );
    }

});

ReactDOM.render(<App />, document.querySelector('.container-fluid'));
