var React = require('react');
var ReactDOM = require('react-dom');
var createReactClass = require('create-react-class');
var CountrySearch = require('./country-search');

var App = createReactClass({
    render: function () {
        return (
            <div>
                <CountrySearch />
            </div>
        );
    }

});

ReactDOM.render(<App />, document.querySelector('.container-fluid'));
