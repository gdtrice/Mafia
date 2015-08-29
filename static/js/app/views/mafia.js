define([
    "react",
    "underscore",
    "socket.io",
    "constants",
    "models/mafia",
    "views/player_picker_list",
    "views/night_wait"
],
function (
    React,
    _,
    io,
    CONSTANTS,
    MafiaModel,
    PlayerPickerListView,
    NightWaitView
    ) {
    return React.createClass({
        componentDidMount: function() {
            this.mafia = new MafiaModel({
                player: this.props.currentPlayer.attributes,
                gameId: this.props.game.get('_id')
            });

            this.socket = io();
            this.socket.on('mafia_action', this._renderNightAction);
            this.socket.on('day_action', this._renderDayView);
            this.mafia.on('kill_complete', this._renderKillResults);
        },

        getInitialState: function() {
            return {nightAction: false,
                    nightWait: false,
                    dayAction: false,
                    result: null};
        },

        killPlayer: function(player) {
            this.mafia.kill(player);
        },

        _renderNightAction: function(data) {
            this.setState({nightAction: true,
                           nightWait: false,
                           dayAction: false,
                           result: null});
        },

        _renderNightWait: function(data) {
            this.setState({nightAction: false,
                           nightWait: true,
                           dayAction: false,
                           result: null});
        },

        _renderKillResults: function(data) {
            this.setState({nightAction: false,
                           nightWait: false,
                           dayAction: false,
                           result: data.result});
        },

        _renderDayView: function(data) {
            this.setState({nightAction: false,
                           nightWait: false,
                           dayAction: true,
                           result: null});
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
                       <NightWaitView />
                );
            } else if (!_.isNull(this.state.result)) {
                _.delay(this._renderNightWait, CONSTANTS.NIGHT_DELAY);
                return (
                        <div>  {this.state.result}  </div>
                );
            } else if (this.state.dayAction === true) {
                return (
                        <div>  day view will go here...trust me </div>
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
