define([
    "react"
],
function (
    React
    ) {
    return React.createClass({
        render: function() {
            var tempStyle = {
                width: "100px",
                height: "100px"
            };
            return (
                <li>
                    <img id="user-pic" style={{ width: tempStyle.width, height: tempStyle.height }} src={ this.props.player.get('picture') }></img>
                    <div id="username">{ this.props.player.get('username') }</div>
                </li>
            );
        }
    });
});

