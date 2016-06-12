define([
    "react",
    "constants",
    "underscore",
    "views/player_picker_list",
    "views/nomination_results",
    "models/ballot_box"
],
function (
    React,
    CONSTANTS,
    _,
    PlayerPickerListView,
    NominationResults,
    BallotBox
    ) {
    return React.createClass({
        getInitialState: function() {
            return {voted: false};
        },

        componentDidMount: function() {
            this.ballotBox = new BallotBox({_id: this.props.game.id,
                                            voter: this.props.game.get('currentPlayer').get('username')});
        },

        vote: function(player) {
            this.ballotBox.vote(player.get('username'));
            this.setState({voted: true});
        },

        render: function() {
            if (this.state.voted) {
                return (
                    <div>
                        <div> We're switching to results!</div>
                        <NominationResults game={ this.props.game } />
                    </div>
                );
            } else {
                return (
                    <div>
                        <div> Who do you think is the killer!? </div>
                        <PlayerPickerListView players={ this.props.game.getActivePlayers() } onPlayerSelected={ this.vote } />
                    </div>
                );
            }
        }
    });
});
