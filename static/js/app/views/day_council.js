define([
    "react",
    "constants",
    "underscore",
    "views/player_picker_list",
    "models/ballot_box"
],
function (
    React,
    CONSTANTS,
    _,
    PlayerPickerListView,
    BallotBox
    ) {
    return React.createClass({
        vote: function(player) {
            var bb = new BallotBox({_id: this.props.game.id,
                                    voter: this.props.game.get('currentPlayer').get('username'),
                                    nominee: player.get('username')});
            bb.vote();
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
