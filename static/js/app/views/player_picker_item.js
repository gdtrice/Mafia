define([
    "react"
],
function (
    React
    ) {
    return React.createClass({
        notifyPlayerSelected: function() {
            this.props.onPlayerSelected(this.props.player);
        },

        render: function() {
            var tempStyle = {
                width: "100px",
                height: "100px"
            };
            return (
                <li onClick={ this.notifyPlayerSelected }>
                    <img id="user-pic" style={{ width: tempStyle.width, height: tempStyle.height }} src={ this.props.player.get('picture') }></img>
                    <div id="username">{ this.props.player.get('username') }</div>
                </li>
            );
        }
    });
});
