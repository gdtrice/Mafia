define([
    "react",
    "underscore",
    "socket.io",
    "models/mafia",
    "views/player_picker_list"
],
function (
    React,
    _,
    io,
    MafiaModel,
    PlayerPickerListView
    ) {
    return React.createClass({
        componentDidMount: function() {
            this.mafia = new MafiaModel({
                player: this.props.currentPlayer.attributes,
                gameId: this.props.game.get('_id')
            });

            this.socket = io();
            this.socket.on('night_action', this._renderNightAction);
            this.mafia.on('kill_complete', this._renderKillResults);
        },

        getInitialState: function() {
            return {nightAction: false,
                    nightWait: false,
                    day: false,
                    result: null};
        },

        killPlayer: function(player) {
            this.mafia.kill(player);
        },

        _renderNightAction: function(data) {
            this.setState({nightAction: true,
                           nightWait: false});
        },

        _renderNightWait: function(data) {
            this.setState({nightAction: false,
                           nightWait: true,
                           result: null});
        },

        _renderKillResults: function(data) {
            this.setState({nightAction: false,
                           nightWait: false,
                           result: data.result});
        },

        render: function() {
            if(this.state.nightAction === true) {
                return (
                    <div>
                        <div> Its night time player...who do you want to kill? </div>
                        <PlayerPickerListView players={ this.props.game.get('players') } onPlayerSelected={ this.killPlayer } />
                    </div>
                );
            } else if (this.state.nightWait === true) {
                return (
                        <div> Night time... Please wait! </div>
                );
            } else if (!_.isNull(this.state.result)) {
                _.delay(this._renderNightWait, 4000);
                return (
                        <div>  {this.state.result}  </div>
                );
            }
            var tempStyle = {
                width: "100px",
                height: "100px"
            };

            return (
                <div className="mafia-container">
                    <img id="role-pic" style={{ width: tempStyle.width, height: tempStyle.height }} src={ this.props.currentPlayer.get('role').picture }></img>
                    <div id="role-name">{ this.props.currentPlayer.get('role').name }</div>
                </div>
            );
        }
    });
});
