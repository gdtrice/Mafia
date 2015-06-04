define([
    "react",
    "views/player_list"
],
function (
    React,
    PlayerList
    ) {
    return React.createClass({
        render: function() {
            return (
                <div className="game-room">
                    <div>Game Room: { this.props.game.id }</div>
                    <div>Current Players:</div>
                    <PlayerList players={ this.props.game.get("players") } />       
                </div>
            );
        }
    });
});
