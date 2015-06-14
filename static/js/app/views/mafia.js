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
            this.socket.on('kill_registered', this._renderNightWait);
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
                        <div> Its night time player...who do you want to kill? </div>
                        <PlayerPickerListView players={ this.props.game.get('players') } />
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
                <div className="mafia-container">
                    <img id="role-pic" style={{ width: tempStyle.width, height: tempStyle.height }} src={ this.props.currentPlayer.get('role').picture }></img>
                    <div id="role-name">{ this.props.currentPlayer.get('role').name }</div>
                </div>
            );
        }
    });
});


