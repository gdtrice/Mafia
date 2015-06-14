define([
    "react",
    "underscore",
    "socket.io",
    "views/player_picker_list"
],
function (
    React,
    _,
    io,
    PlayerPickerListView
    ) {
    return React.createClass({
        componentDidMount: function() {
            this.socket = io();
            this.socket.on('night_action', this._renderNightAction);
            // TODO: change kill event for doc
            this.socket.on('kill_registered', this._renderNightWait);
        },

        savePlayerLife: function(player) {
            // save player
        },

        getInitialState: function() {
            return {nightAction: false,
                    nightWait: false,
                    day: false};
        },

        _renderNightAction: function(data) {
            this.setState({nightAction: true,
                           nightWait: false});
        },

        _renderNightWait: function(data) {
            this.setState({nightAction: false,
                           nightWait: true});
        },
        render: function() {
            if(this.state.nightAction === true) {
                return (
                    <div>
                        <div> Its night time player...save someones life! </div>
                        <PlayerPickerListView players={ this.props.game.get('players') } onPlayerSelected={ this.savePlayerLife } />
                    </div>
                );
            } else if (this.state.nightWait === true) {
                return (
                        <div> Night time...Please wait! </div>
                );
            }
            var tempStyle = {
                width: "100px",
                height: "100px"
            };
            return (
                <div className="doctor-container">
                    <img id="role-pic" style={{ width: tempStyle.width, height: tempStyle.height }} src={ this.props.currentPlayer.get('role').picture }></img>
                    <div id="role-name">{ this.props.currentPlayer.get('role').name }</div>
                </div>
            );
        }
    });
});


