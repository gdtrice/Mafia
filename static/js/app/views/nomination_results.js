define([
    "react",
    "underscore",
    "views/player_item",
    "views/polling_mixin"
],
function (
    React,
    _,
    PlayerItemView,
    PollingMixin
    ) {
    return React.createClass({
        mixins: [PollingMixin],

        getInitialState: function() {
            return {round: undefined};
        },

        componentWillMount: function() {
            // Init the mixin with necessary vars
            this.POLL_FUNCTION = this._getRoundResults;
        },

        componentDidMount: function() {
            this.startPolling();
        },

        _getRoundResults: function() {
            var currentRound = this.props.game.getCurrentRound();
            this.setState({round: currentRound});
        },

        render: function() {
            if (this.state.round) {
                var playerItems = [];
                var ballots = this.state.round.get('day_data')
                _.each(ballots, function(ballot) {
                    var player = this.props.game.get('players').findWhere({username: ballot.nominee});
                    playerItems.push((
                        <div className="row">
                          <div className="col-xs-6 col-md-3">
                            <a href="#" className="thumbnail">
                                <img src={ player.get('picture') } className="img-rounded"></img>
                                <h4 className="card-title">{ player.get('username') }</h4>
                            </a>
                            <div>Votes: { ballot.voters.length }</div> 
                          </div>
                        </div>));
                }, this);

                return (
                    <div>
                        <ul id="player-list">
                            { playerItems }
                        </ul>
                    </div>
                );
            } else {
                return (<div> Fetching Voting Results... </div>);
            }
        }
    });
});
