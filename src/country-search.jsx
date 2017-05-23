var React = require('react');
var ReactDOM = require('react-dom');
var createReactClass = require('create-react-class');
var VideosList = require('./videos-list');
var Api = require('./api');

module.exports = createReactClass({
    getInitialState: function () {
        return {
            countries: [],
            choice: '',
            videoLists: [],
            fetchingData: false,
            nextPageToken: null,
            prevPageToken: null,
            location: '',
            distance: 10,
            sliderValue: 10
        }
    },
    componentWillMount: function () {

    },
    componentDidMount: function () {
        ReactDOM.findDOMNode(this.refs.locaSearch).focus();
    },
    handleChange: function (e) {
        /* Regex for alphanumeric + arabic*/
        // if(e.target.value.match(/[a-z0-9\u0600-\u06FF]/i)){
        if (e.target.value) {
            this.setState({choice: e.target.value});
            Api.getCountries(e.target.value)
                .then(function (data) {
                    this.setState({
                        countries: data.results
                    });
                }.bind(this));
        } else {
            this.setState({
                countries: [],
                choice: '',
                videoLists: [],
                fetchingData: false
            });
        }
    },
    getVideos: function (loca, locationRadius) {
        Api.getVideos(loca, locationRadius)
            .then(function (data) {
                this.setState({
                    videoLists: data.items,
                    fetchingData: false,
                    nextPageToken: data.nextPageToken
                });
                if (!data.pageInfo.totalResults) {
                    alert('No videos uploaded from this location');
                }
            }.bind(this));
    },
    getNextYoutoubePage: function (loca, pageToken, locationRadius) {
        if (pageToken) {
            Api.getYoutubePage(loca, pageToken, locationRadius)
                .then(function (data) {
                    this.setState({
                        videoLists: data.items,
                        fetchingData: false,
                        nextPageToken: data.nextPageToken,
                        prevPageToken: data.prevPageToken
                    });
                }.bind(this));
        }
    },
    getPrevYoutoubePage: function (loca, pageToken, locationRadius) {
        if (pageToken) {
            Api.getYoutubePage(loca, pageToken, locationRadius)
                .then(function (data) {
                    this.setState({
                        videoLists: data.items,
                        fetchingData: false,
                        nextPageToken: data.nextPageToken,
                        prevPageToken: data.prevPageToken
                    });
                }.bind(this));
        }
    },
    handleListItemClick: function (idx, country, e) {
        e.preventDefault();
        var loc = country.geometry.location.lat + ',' + country.geometry.location.lng;
        this.setState({
            countries: [],
            choice: e.target.text,
            fetchingData: true,
            location: loc
        });
        this.getVideos(loc, this.state.distance);
    },
    handleFocus: function () {
        this.setState({
            countries: [],
            choice: '',
            videoLists: [],
            fetchingData: false,
            nextPageToken: null,
            prevPageToken: null
        });
    },
    handleNextPage: function () {
        this.setState({
            videoLists: [],
            fetchingData: !!this.state.nextPageToken
        });
        this.getNextYoutoubePage(this.state.location, this.state.nextPageToken, this.state.distance);
    },
    handlePrevPage: function () {
        this.setState({
            videoLists: [],
            fetchingData: !!this.state.prevPageToken
        });
        this.getPrevYoutoubePage(this.state.location, this.state.prevPageToken, this.state.distance);
    },
    handleSliderChange: function (e) {
        var val = e.target.value;
        var min = e.target.min;
        this.setState({
            distance: val,
            sliderValue:(val - min) * 100 / (e.target.max - min)
        });
    },
    render: function () {
        return <div>
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="form-group">
                                <div className="input-group">
                                    <span className="input-group-addon" id="term">
                                        <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
                                    </span>
                                    <input onFocus={this.handleFocus}
                                           placeholder="type a location to search"
                                           ref="locaSearch"
                                           onChange={this.handleChange}
                                           type="text"
                                           className="form-control" id="loc"
                                           aria-describedby="term"
                                           value={this.state.choice}/>
                                </div>
                                <div className="y-buttons">
                                    <button onClick={this.handlePrevPage}
                                            className="btn btn-warning btn-lg" type="button"
                                            disabled={!this.state.prevPageToken || this.state.fetchingData}>
                                        <span className="glyphicon glyphicon-backward" aria-hidden="true"></span>
                                    </button>
                                    <button onClick={this.handleNextPage}
                                            className="btn btn-success btn-lg" type="button"
                                            disabled={!this.state.nextPageToken || this.state.fetchingData}>
                                        <span className="glyphicon glyphicon-forward" aria-hidden="true"></span>
                                    </button>
                                    {!this.state.videoLists.length &&(!this.state.nextPageToken  && !this.state.prevPageToken
                                    && !this.state.fetchingData)?
                                        <input type="range"
                                               min="1"
                                               max="100"
                                               value={this.state.distance}
                                               step="1"
                                               name="locationrange"
                                               onChange={this.handleSliderChange}
                                               style={{backgroundSize: this.state.sliderValue + '% 100%'}}
                                        />:''}
                                    <div className="row">
                                        <div className="col-xs-12">
                                            <span id="lblrange" className="label label-default">{this.state.distance} KM</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="list-group">
                                {this.renderCountries()}
                            </div>
                        </div>
                    </div>
            <VideosList videoLs={this.state.videoLists}
                        loadingData={this.state.fetchingData}/>
        </div>
    },
    renderCountries: function () {
        if (this.state.countries.length) {
            return this.state.countries.map(function (country, idx) {
                return <a onClick={this.handleListItemClick.bind(this, idx, country)}
                          key={country.place_id}
                          href="#"
                          className="list-group-item">
                    {country.formatted_address}
                </a>
            }.bind(this));
        }
    }
});
