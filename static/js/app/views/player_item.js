define([
    "react"
],
function (
    React
    ) {
    return React.createClass({
        render: function() {
            return (
                <div className="row">
                  <div className="col-xs-6 col-md-3">
                    <a href="#" className="thumbnail">
                        <img src={ this.props.player.get('picture') } className="img-rounded"></img>
                        <h4 className="card-title">{ this.props.player.get('username') }</h4>
                    </a>
                  </div>
                </div>
            );
        }
    });
});

