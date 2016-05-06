define([
    "react",
    "constants",
    "underscore",
    "views/player_picker_list"
],
function (
    React,
    CONSTANTS,
    _,
    PlayerPickerList
    ) {
    return React.createClass({
        vote: function(player) {
            // TODO: add vote
        },

        render: function() {
            return (
                <div>
                    <div> Who do you think is the killer!? </div>
                    <PlayerPickerListView players={ this.props.game.get('players') } onPlayerSelected={ this.vote } />
                </div>
            );
        }
    });
});
