define([
    "react",
    "underscore",
    "socket.io",
    "constants",
    "views/day_council",
    "views/night_wait"
],
function (
    React,
    _,
    io,
    CONSTANTS,
    DayCouncilView,
    NightWaitView
    ) {
    return {
        componentDidMount: function() {
            this.socket = io();
            this.socket.on('day_action', this._renderDayView);
        },

        performRoleAction: function(func) {
            func();
        },

        DEFAULT_STATE: {nightAction: false,
                         nightWait: false,
                         dayAction: false,
                         killResult: null,
                         result: null},

        _renderNightAction: function() {
            this.setState({nightAction: true,
                           dayAction: false,
                           nightWait: false,
                           killResult: null,
                           result: null});
        },

        _renderNightWait: function() {
            this.setState({nightAction: false,
                           dayAction: false,
                           nightWait: true,
                           killResult: null,
                           result: null});
        },

        _renderRoleActionResults: function(data) {
            // Should probably pass the entire data package to
            // be completely generic
            this.setState({nightAction: false,
                           nightWait: false,
                           dayAction: false,
                           killResult: null,
                           result: data.result});
        },

        _renderDayView: function(data) {
            // Should probably pass the entire data package to
            // be completely generic
            this.setState({nightAction: false,
                           dayAction: true,
                           nightWait: false,
                           killResult: data.killedPlayer,
                           result: null});
        },

        getViewForRender: function(nightActionView) {
            console.log('in role mixin');
            if(this.state.nightAction === true) {
                // TODO: react element validation
                return nightActionView;
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
                <div className="role-container">
                    <img id="role-pic" style={{ width: tempStyle.width, height: tempStyle.height }} src={ this.props.currentPlayer.get('role').picture }></img>
                    <div id="role-name">{ this.props.currentPlayer.get('role').name }</div>
                </div>
            );
        }
    };
});
