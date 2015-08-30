define([
    "react",
    "underscore",
    "socket.io",
    "constants",
    "models/detective",
    "views/day_council",
    "views/player_picker_list",
    "views/night_wait"
],
function (
    React,
    _,
    io,
    CONSTANTS,
    DetectiveModel,
    DayCouncilView,
    PlayerPickerListView,
    NightWaitView
    ) {
    return React.createClass({
        componentDidMount: function() {
            this.detective = new DetectiveModel({
                player: this.props.currentPlayer.attributes,
                gameId: this.props.game.get('_id')});

            this.socket = io();
            this.socket.on('detective_action', this._renderNightAction);
            this.socket.on('day_action', this._renderDayView);

            this.detective.on('investigate_complete', this._renderInvestigationResults);
        },

        getInitialState: function() {
            return {nightAction: false,
                    nightWait: false,
                    day: false,
                    result: null};
        },

        investigatePlayer: function(suspect) {
            this.detective.investigate(suspect);
        },

        _renderNightAction: function(data) {
            this.setState({nightAction: true,
                           nightWait: false,
                           dayAction: false,
                           result: null});
        },

        _renderNightWait: function() {
            this.setState({nightAction: false,
                           nightWait: true,
                           dayAction: false,
                           result: null});
        },

        _renderInvestigationResults: function(data) {
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
            if(this.state.nightAction) {
                return (
                    <div>
                        <div> Its night time player...who do you think the mafia is? </div>
                        <PlayerPickerListView players={ this.props.game.get('players') } onPlayerSelected={ this.investigatePlayer } />
                    </div>
                );
            } else if (this.state.nightWait) {
                // TODO: These should all look the same in case people are playing in the same location
                return (
                       <NightWaitView />
                );
            } else if (!_.isNull(this.state.result)) {
                _.delay(this._renderNightWait, CONSTANTS.NIGHT_DELAY);
                return (
                        <div> Results from your investigation: {this.state.result.toString()}  </div>
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
                <div className="detective-container">
                    <img id="role-pic" style={{ width: tempStyle.width, height: tempStyle.height }} src={ this.props.currentPlayer.get('role').picture }></img>
                    <div id="role-name">{ this.props.currentPlayer.get('role').name }</div>
                </div>
            );
        }
    });
});
