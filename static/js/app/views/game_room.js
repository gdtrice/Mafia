define([
    "react",
    "underscore",
    "constants",
    "models/game",
    "views/player_list",
    "views/mafia",
    "views/detective",
    "views/doctor",
    "views/townsperson",
    "views/polling_mixin"
],
function (
    React,
    _,
    CONSTANTS,
    GameModel,
    PlayerList,
    MafiaView,
    DetectiveView,
    DoctorView,
    TownspersonView,
    PollingMixin
    ) {
    return React.createClass({
        mixins: [PollingMixin],

        getInitialState: function() {
            return {game: this.props.game};
        },

        componentWillMount: function() {
            // Init the mixin with necessary vars
            this.POLL_FUNCTION = this._getGameState;
        },

        componentDidMount: function() {
            this.startPolling();
        },

        startGame: function() {
            this.props.game.startGame();
            this.setState({game: this.props.game});
        },

        _getGameState: function() {
            var self = this;
            this.props.game.fetch({
                success: function(resp, status) {
                    self.setState({game: resp});
                },
                error: function(resp, status) {
                    console.log(status);
                }
            });
        },

        render: function() {
            if (_.isNumber(this.state.game.get('startDate'))) {
                this.stopPolling();
                var stateDiv = (<div></div>);
                var currentPlayer = this.state.game.getCurrentPlayer();
                switch (currentPlayer.get('role').name) {
                    case 'mafia':
                        return (
                                <MafiaView currentPlayer={ currentPlayer } game={this.state.game} />
                        );
                    case 'detective': 
                        return (
                                <DetectiveView currentPlayer={ currentPlayer } game={this.state.game} />
                        );
                    case 'doctor': 
                        return (
                                <DoctorView currentPlayer={ currentPlayer } game={this.state.game} />
                        );
                    case 'townsperson':
                        return (
                                <TownspersonView currentPlayer={ currentPlayer } game={this.state.game} />
                        );
                    default:
                        console.log('Invalid Role!!!');
                }
            } else if (this.state.game.get('createdBy') === this.props.currentPlayer.get('username')) {
                if(this.state.game.get('players').length < CONSTANTS.PLAYER_MINIMUM) {
                    stateDiv = (<div>Waiting for other players to join</div>);
                } else {
                    stateDiv = (<input className="btn btn-default" type="button" onClick={this.startGame} value="Start Game" />);
                }
            } else {
                stateDiv = (<div> Waiting for { this.state.game.get('createdBy') } to start the game... </div>);
            }


            return (
                <div className="game-room">
                    <div>Game Room: { this.state.game.id }</div>
                    <div>Current Players:</div>
                    <PlayerList players={ this.state.game.get('players').toArray() } />
                    { stateDiv }
                </div>
            );
        }
    });
});
