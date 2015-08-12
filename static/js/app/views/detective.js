define([
    "react",
    "underscore",
    "socket.io",
    "models/detective",
    "views/player_picker_list"
],
function (
    React,
    _,
    io,
    DetectiveModel,
    PlayerPickerListView
    ) {
    return React.createClass({
        componentDidMount: function() {
            this.detective = new DetectiveModel(this.props.currentPlayer.attributes);
            this.socket = io();
            this.socket.on('night_action', this._renderNightAction);
            // TODO: change kill event for detective
            this.socket.on('kill_registered', this._renderNightWait);
        },

        getInitialState: function() {
            return {nightAction: false,
                    nightWait: false,
                    day: false};
        },

        investigatePlayer: function(suspect) {
            console.log('detective is:');
            console.log(this.detective);
            console.log('suspect is:');
            console.log(suspect);
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
            if(this.state.nightAction) {
                return (
                    <div>
                        <div> Its night time player...who do you think the mafia is? </div>
                        <PlayerPickerListView players={ this.props.game.get('players') } onPlayerSelected={ this.investigatePlayer } />
                    </div>
                );
            } else if (this.state.nightWait) {
                return (
                        <div> Night time...Please wait! </div>
                );
            }
            var tempStyle = {
                width: "100px",
                height: "100px"
            };
            return (
                <div className="detective-container">
                    <img id="role-pic" style={{ width: tempStyle.width, height: tempStyle.height }} src={ this.props.currentPlayer.get('role').picture }></img>
                    <div id="role-name">{ this.props.currentPlayer.get('role').name }</div>
                </div>
            );
        }
    });
});
