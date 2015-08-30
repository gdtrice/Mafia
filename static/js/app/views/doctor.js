define([
    "react",
    "underscore",
    "socket.io",
    "constants",
    "models/doctor",
    "views/day_council",
    "views/player_picker_list",
    "views/night_wait"
],
function (
    React,
    _,
    io,
    CONSTANTS,
    DoctorModel,
    DayCouncilView,
    PlayerPickerListView,
    NightWaitView
    ) {
    return React.createClass({
        componentDidMount: function() {
            this.doctor = new DoctorModel({
                player: this.props.currentPlayer.attributes,
                gameId: this.props.game.get('_id')
            });

            this.socket = io();
            this.socket.on('doctor_action', this._renderNightAction);
            this.socket.on('day_action', this._renderDayView);
            this.doctor.on('save_complete', this._renderSaveResults);
        },

        savePlayerLife: function(player) {
            this.doctor.save(player);
        },

        getInitialState: function() {
            return {nightAction: false,
                    nightWait: false,
                    dayAction: false,
                    result: null};
        },

        _renderNightAction: function(data) {
            this.setState({nightAction: true,
                           dayAction: false,
                           nightWait: false,
                           result: null});
        },

        _renderSaveResults: function(data) {
            this.setState({nightAction: false,
                           nightWait: false,
                           dayAction: false,
                           result: data.result});
        },

        _renderNightWait: function(data) {
            this.setState({nightAction: false,
                           dayAction: false,
                           nightWait: true,
                           result: null});
        },

        _renderDayView: function(data) {
            this.setState({nightAction: false,
                           dayAction: true,
                           nightWait: false,
                           result: null});
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
                       <NightWaitView />
                );
            } else if (!_.isNull(this.state.result)) {
                _.delay(this._renderNightWait, CONSTANTS.NIGHT_DELAY);
                return (
                        <div>  {this.state.result}  </div>
                );
            } else if (this.state.dayAction === true) {
                return (
                        <DayCouncilView />
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


