define([
    "react",
    "models/game_config"
],
function (
    React,
    GameConfig
    ) {
    return React.createClass({
        componentDidMount: function() {
            this.gameConfig = new GameConfig();
        },

        joinGame: function(e) {
            e.preventDefault();
            var gameCode = React.findDOMNode(this.refs.gameCode).value.trim();
            p2Game = this.gameConfig.joinGame(gameCode, "newUserHere2");
            this.props.onGameCodeRetrieved(gameCode);
        },

        createGame: function(e) {
            e.preventDefault();

            // creating a fake username for now
            var username = "firstUser";
            var self = this;
            this.gameConfig.createGame(username, {
                                       success: function(code) {
                                           self.props.onGameCodeRetrieved(code);
                                       },
                                       error: function() {
                                           console.log("View recieved an error");
                                   }
            });
        },

        render: function() {
            return (
                <div>
                    <form onSubmit={this.createGame}>
                        <input type="submit" value="New Game" />
                    </form>
                    <form onSubmit={this.joinGame}>
                        Join room: <input type="text" placeholder="enter room id..." ref="gameCode" />
                        <input type="submit" value="Join" />
                    </form>
                </div>
            );
        }
    });
});
