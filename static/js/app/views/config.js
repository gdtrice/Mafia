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
            p2Game = this.gameConfig.joinGame(parseInt(gameCode, 10), "newUserHere2");
            this.props.onGameCodeRetrieved(code);
        },

        createGame: function(e) {
            e.preventDefault();
            // creating a fake username for now
            var username = "firstUser";

            // TODO: createGame should probably automatically add this user...
            var code = this.gameConfig.createGame(username);
            var p1Game = this.gameConfig.joinGame(code, username);
            this.props.onGameCodeRetrieved(code);
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
