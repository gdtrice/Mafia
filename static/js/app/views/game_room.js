define([
    "react",
    "underscore",
    "models/game",
    "views/player_list",
    "views/mafia",
    "views/detective",
    "views/doctor",
    "views/townsperson"
],
function (
    React,
    _,
    GameModel,
    PlayerList,
    MafiaView,
    DetectiveView,
    DoctorView,
    TownspersonView
    ) {
    return React.createClass({
        POLL_INTERVAL: 3000, // 3 seconds

        getInitialState: function() {
            return {game: this.props.game};
        },

        componentDidMount: function() {
            this.poll = setInterval(this.loadPlayers, this.POLL_INTERVAL);
        },

        loadPlayers: function() {
            this._updateGameState();            
        },

        startGame: function() {
            this.props.game.startGame();
            this.setState({game: this.props.game});
        },

        _updateGameState: function() {
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
                clearInterval(this.poll);
                var stateDiv = (<div></div>);
                // This is hacky, props.currentPlayer should continuosly update...
                var currentPlayer = this.state.game.getPlayerRole(this.props.currentPlayer.get('username'));
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
                // TODO: 3 is the current amount of roles that are necessary to play...should be the amount to actually play a round with 3 roles.
                if(this.state.game.get('players').length < 3) {
                    stateDiv = (<div>Waiting for other players to join</div>);
                } else {
                    stateDiv = (<button type="button" onClick={this.startGame}> Start Button </button>);
                }
            } else {
                stateDiv = (<div> Waiting for { this.state.game.get('createdBy') } to start the game... </div>);
            }

            return (
                <div className="game-room">
                    <div>Game Room: { this.state.game.id }</div>
                    <div>Current Players:</div>
                    <PlayerList players={ this.state.game.get('players') } />
                    { stateDiv }
                </div>
            );
        }
    });
});
