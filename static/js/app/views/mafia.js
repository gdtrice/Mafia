define([
    "react",
    "underscore",
    "socket.io",
    "constants",
    "models/mafia",
    "views/player_picker_list",
    "views/night_wait",
    "views/day_council"
],
function (
    React,
    _,
    io,
    CONSTANTS,
    MafiaModel,
    PlayerPickerListView,
    NightWaitView,
    DayCouncilView
    ) {
    return React.createClass({
        componentDidMount: function() {
            this.mafia = new MafiaModel({
                player: this.props.currentPlayer.attributes,
                gameId: this.props.game.get('_id')
            });

            this.socket = io();
            this.socket.on('mafia_action', this._renderNightAction);
            this.socket.on('day_action', this._renderDayView.bind(this));
            this.mafia.on('kill_complete', this._renderKillResults);
        },

        getInitialState: function() {
            return {nightAction: false,
                    nightWait: false,
                    dayAction: false,
                    killResult: null,
                    result: null};
        },

        killPlayer: function(player) {
            this.mafia.kill(player);
        },

        _renderNightAction: function(data) {
            this.setState({nightAction: true,
                           nightWait: false,
                           dayAction: false,
                           killResult: null,
                           result: null});
        },

        _renderNightWait: function(data) {
            this.setState({nightAction: false,
                           nightWait: true,
                           dayAction: false,
                           killResult: null,
                           result: null});
        },

        _renderKillResults: function(data) {
            this.setState({nightAction: false,
                           nightWait: false,
                           dayAction: false,
                           killResult: null,
                           result: data.result});
        },

        _renderDayView: function(data) {
            this.setState({nightAction: false,
                           nightWait: false,
                           dayAction: true,
                           killResult: data.killedPlayer,
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
                        <DayCouncilView killedPlayer={ this.state.killResult }/>
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
