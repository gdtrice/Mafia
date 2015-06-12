define([
    "react",
    "underscore"
],
function (
    React,
    _
    ) {
    return React.createClass({
        render: function() {
            var tempStyle = {
                width: "100px",
                height: "100px"
            };
            return (
                <div className="doctor-container">
                    <img id="role-pic" style={{ width: tempStyle.width, height: tempStyle.height }} src={ this.props.currentPlayer.get('role').picture }></img>
                    <div id="role-name">{ this.props.currentPlayer.get('role').name }</div>
                </div>
            );
        }
    });
});


