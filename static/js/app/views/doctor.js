define([
    "react",
    "underscore",
    "socket.io",
    "models/doctor",
    "views/player_picker_list",
    "views/night_wait"
],
function (
    React,
    _,
    io,
    DoctorModel,
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

            this.doctor.on('save_complete', this._renderSaveResults);
        },

        savePlayerLife: function(player) {
            this.doctor.save(player);
        },

        getInitialState: function() {
            return {nightAction: false,
                    nightWait: false,
                    day: false,
                    result: null};
        },

        _renderNightAction: function(data) {
            this.setState({nightAction: true,
                           nightWait: false});
        },

        _renderSaveResults: function(data) {
            this.setState({nightAction: false,
                           nightWait: false,
                           result: data.result});
        },

        _renderNightWait: function(data) {
            this.setState({nightAction: false,
                           nightWait: true,
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
                        <div> Night time...Please wait! </div>
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
                <div className="doctor-container">
                    <img id="role-pic" style={{ width: tempStyle.width, height: tempStyle.height }} src={ this.props.currentPlayer.get('role').picture }></img>
                    <div id="role-name">{ this.props.currentPlayer.get('role').name }</div>
                </div>
            );
        }
    });
});


