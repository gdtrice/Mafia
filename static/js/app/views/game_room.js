define([
    "react",
    "underscore",
    "models/game",
    "views/player_list",
    "views/mafia",
    "views/detective",
    "views/townsperson"
],
function (
    React,
    _,
    GameModel,
    PlayerList,
    MafiaView,
    DetectiveView,
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
                var currentPlayerRole = this.state.game.getPlayerRole(this.props.currentPlayer.get('username'));
                switch (currentPlayerRole) {
                    case 'mafia':
                        <MafiaView currentPlayerRole={ currentPlayerRole } game={this.state.game} />
                        break;
                    case 'detective': 
                        <DetectiveView currentPlayerRole={ currentPlayerRole } game={this.state.game} />
                        break;
                    case 'townsperson':
                        <TownspersonView currentPlayerRole={ currentPlayerRole } game={this.state.game} />
                        break;
                    default:
                        console.log('Invalid Role!!!');
                }
            } else if (this.state.game.get('createdBy') === this.props.currentPlayer.get('username')) {
             // Show start button
             return (
                    <div className="game-room">
                        <div>Game Room: { this.state.game.id }</div>
                        <div>Current Players:</div>
                        <PlayerList players={ this.state.game.get('players') } />
                        <button type="button" onClick={this.startGame}> Start Button </button>
                    </div>
                );
            }

            return (
                <div className="game-room">
                    <div>Game Room: { this.state.game.id }</div>
                    <div>Current Players:</div>
                    <PlayerList players={ this.state.game.get('players') } />
                    <div> Waiting for { this.state.game.get('createdBy') } to start the game... </div>
                </div>
            );
        }
    });
});
