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
            return {game: "" , currentPlayer: ""};
        },

        loadGameView: function(data) {
            this.setState(data);
        },

        render: function() {
            if (!_.isEmpty(this.state.game)) {
                return (
                    <GameRoomView game={this.state.game} currentPlayer={this.state.currentPlayer} />
                );
            } 
            return (
                <ConfigView onGameCodeRetrieved={this.loadGameView}/>
            );
        }
    });
});
