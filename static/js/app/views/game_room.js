define([
    "react",
    "views/player_list",
    "models/game",
],
function (
    React,
    PlayerList,
    GameModel
    ) {
    return React.createClass({
        POLL_INTERVAL: 3000, // 3 seconds

        getInitialState: function() {
            return {game: this.props.game};
        },

        componentDidMount: function() {
            setInterval(this.loadPlayers, this.POLL_INTERVAL);
        },

        loadPlayers: function() {
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
            if (this.state.game.get('createdBy') === this.props.currentPlayer.get('username')) {
             // Show start button
             return (
                    <div className="game-room">
                        <div>Game Room: { this.state.game.id }</div>
                        <div>Current Players:</div>
                        <PlayerList players={ this.state.game.get('players') } />
                        <div> Start Button </div>
                    </div>
                );
            }

            return (
                <div className="game-room">
                    <div>Game Room: { this.state.game.id }</div>
                    <div>Current Players:</div>
                    <PlayerList players={ this.state.game.get('players') } />
                </div>
            );
        }
    });
});
