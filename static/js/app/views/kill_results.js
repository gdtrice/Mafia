define([
    "react",
    "constants",
    "underscore"
],
function (
    React,
    CONSTANTS,
    _
    ) {
    return React.createClass({
        render: function() {
            var tempStyle = {
                width: "100px",
                height: "100px"
            };
            if (!_.isNull(this.props.killedPlayer)) {
                return (
                        <div>{this.props.killedPlayer} died in the night... :( </div>
                );
            } else {
                return (
                    <div> Nobody died!!!!! Celebrate good times </div>
                );
            }
        }
    });
});

