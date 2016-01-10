define([
    "react",
    "underscore",
    "models/game_config",
    "constants",
    "views/create_player"
],
function (
    React,
    _,
    GameConfig,
    CONSTANTS,
    CreatePlayerView
    ) {
    return React.createClass({
        getInitialState: function() {
            return {gameType: CONSTANTS.GAME_TYPES.UNKNOWN};
        },

        componentDidMount: function() {
            this.gameConfig = new GameConfig();
        },

        joinGame: function(player) {

            var joinedGame = this.gameConfig.joinGame(this.state.gameCode, player.get("username"), player.get("picture"));

            if(_.isEmpty(joinedGame)){
                // error callback
                console.log("Tried to join a game but didn't recieve an existing game");
            };
            this.props.onGameCodeRetrieved({game: joinedGame, currentPlayer: player});
        },

        createGame: function(player) {
            var self = this;
            this.gameConfig.createGame(player.get("username"), player.get("picture"), {
                                       success: function(game) {
                                           self.props.onGameCodeRetrieved({game: game, currentPlayer: player});
                                       },
                                       error: function() {
                                           console.log("View recieved an error");
                                       }
            });
        },

        createPlayerFromJoin: function(e) {
            e.preventDefault();
            var gameCode = React.findDOMNode(this.refs.gameCode).value.trim();
            this.setState({gameType: CONSTANTS.GAME_TYPES.EXISTING, gameCode: gameCode});
        },

        createPlayerFromNew: function(e) {
            e.preventDefault();
            this.setState({gameType: CONSTANTS.GAME_TYPES.NEW});
        },

        goToGame: function(player) {
            if (this.state.gameType === CONSTANTS.GAME_TYPES.NEW) {
                this.createGame(player);
            } else {
                this.joinGame(player);
            }
        },

        render: function() {
            if (this.state.gameType !== CONSTANTS.GAME_TYPES.UNKNOWN) {
                return (
                    <CreatePlayerView onPlayerCreated={this.goToGame} />
                );
            } else {
                return (
                    <div>
                        <input className="btn btn-default" type="button" value="New Game" onClick={this.createPlayerFromNew} />
                        <div>
                            Join room: <input type="text" placeholder="enter room id..." ref="gameCode" />
                            <input className="btn btn-default" type="button" value="Join" onClick={this.createPlayerFromJoin} />
                        </div>
                    </div>
                );
            }
        },
    });
});
