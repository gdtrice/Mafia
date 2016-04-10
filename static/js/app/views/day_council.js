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
    // Should repurpose this to display kill results, since voting is moved to roles.
    return React.createClass({
        getInitialState: function() {
            return {voting: false};
        },

        _renderVote: function() {
            var self = this;
            this.props.game.fetch({
                success: function(resp, status) {
                    self.setState({voting: true});
                },
                error: function(resp, status) {
                    console.log(status);
                }
            });
        },

        render: function() {
            var tempStyle = {
                width: "100px",
                height: "100px"
            };
            if (!this.state.voting) {
                _.delay(this._renderVote, CONSTANTS.NIGHT_DELAY);
                if (!_.isNull(this.props.killedPlayer)) {
                    return (
                            <div>{this.props.killedPlayer} died in the night... :( </div>
                    );
                }
                return (
                    <div> Nobody died!!!!! Celebrate good times </div>
                );
            } else {
                return (
                    <div>  Prepare to vote </div>
                    );
            }
        }
    });
});
