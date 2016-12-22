var React = require('react');
var rootVideoURL = 'https://www.youtube.com/watch?v=';

module.exports = React.createClass({
    renderVideos: function () {
        if (!this.props.videoLs.length && !this.props.loadingData) {
            return (
                <div className="col-xs-12">
                    <div className="youtube-copyright">
                        <img src="./coder.jpg"
                             alt="Author copyrith"/>
                    </div>
                </div>
            );
        }
        else if (this.props.loadingData) {
            return (
                <div className="col-xs-12">
                    <div className="loader">
                        <div className="battery">
                            <div className="liquid"></div>
                        </div>
                        <h5>loading...</h5>
                    </div>
                </div>
            );
        }
        return this.props.videoLs.map(function (item) {
            return (
                <div key={item.id.videoId} className="col-xs-6 col-sm-4 col-md-3 col-lg-2 y-videos">
                    <div className="thumbnail">
                        <a href={rootVideoURL + item.id.videoId}
                           title={item.snippet.title}
                           target="_blank">
                            <img src={item.snippet.thumbnails.high.url}
                                 alt=""/>
                        </a>
                        <div className="caption">
                            <p>
                                <a href={rootVideoURL + item.id.videoId}
                                   title={item.snippet.title}
                                   target="_blank">
                                    {item.snippet.title}
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            );
        });
    },
    render: function () {
        return (
            <div className="row">
                {this.renderVideos()}
            </div>
        );
    }
});