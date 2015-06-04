define([
    "underscore",
    "react",
    "views/config",
    "views/game_room"
],
function (
    _,
    React,
    ConfigView,
    GameRoomView
    ) {
    return React.createClass({
        getInitialState: function() {
            return {game: ""};
        },

        loadGameView: function(game) {
            this.setState({game: game});
        },

        render: function() {
            if (!_.isEmpty(this.state.game)) {
                return (
                    <GameRoomView game={this.state.game} />
                );
            } 
            return (
                <ConfigView onGameCodeRetrieved={this.loadGameView}/>
            );
        }
    });
});

