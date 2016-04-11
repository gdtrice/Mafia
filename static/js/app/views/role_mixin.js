define([
    "react",
    "underscore",
    "socket.io",
    "constants",
    "views/day_council",
    "views/kill_results",
    "views/night_wait"
],
function (
    React,
    _,
    io,
    CONSTANTS,
    DayCouncilView,
    KillResultsView,
    NightWaitView
    ) {
    return {
        componentDidMount: function() {
            this.socket = io();
            this.socket.on('night_results', this._renderDayView);
            this.socket.emit('start_game', { gameId: this.props.game.id,
                                             totalPlayers: this.props.game.get('players').length }); 
        },

        DEFAULT_STATE: {nightAction: false,
                         nightWait: false,
                         dayAction: false,
                         killResult: null,
                         voteAction: false,
                         result: null},

        _renderNightAction: function() {
            this.setState({nightAction: true,
                           dayAction: false,
                           nightWait: false,
                           killResult: null,
                           voteAction: false,
                           result: null});
        },

        _renderNightWait: function(roleDoneEmitter) {
            this.setState({nightAction: false,
                           dayAction: false,
                           nightWait: true,
                           killResult: null,
                           voteAction: false,
                           result: null});

            this.socket.emit(roleDoneEmitter, {gameId: this.props.game.get('_id')});
        },

        _renderRoleActionResults: function(data) {
            // Should probably pass the entire data package to
            // be completely generic
            this.setState({nightAction: false,
                           nightWait: false,
                           dayAction: false,
                           killResult: null,
                           voteAction: false,
                           result: data.result});
        },

        _renderDayView: function(data) {
            // Should probably pass the entire data package to
            // be completely generic
            this.setState({nightAction: false,
                           dayAction: true,
                           nightWait: false,
                           killResult: data.killedPlayer,
                           voteAction: false,
                           result: null});
        },

        _renderVote: function() {
            var self = this;
            this.props.game.fetch({
                success: function(resp, status) {
                    self.setState({nightAction: false,
                                   dayAction: false,
                                   nightWait: false,
                                   killResult: null,
                                   voteAction: true,
                                   result: null});
                },
                error: function(resp, status) {
                    console.log(status);
                }
            });
        },

        getViewForRender: function(nightActionView, roleDoneEmitter) {
            // TODO: Should use switch case on action type enum or something..
            if(this.state.nightAction === true) {
                // TODO: react element validation
                return nightActionView;
            } else if (this.state.nightWait === true) {
                return (
                       <NightWaitView />
                );
            } else if (!_.isNull(this.state.result)) {
                _.delay(this._renderNightWait, CONSTANTS.NIGHT_DELAY, roleDoneEmitter);
                return (
                        <div>  {this.state.result}  </div>
                );
            } else if (this.state.dayAction === true) {
                _.delay(this._renderVote, CONSTANTS.NIGHT_DELAY);
                return (
                        <KillResultsView killedPlayer={ this.state.killResult } game={ this.props.game} />
                );
            } else if (this.state.voteAction === true) {
                return (
                        <DayCouncilView game={ this.props.game } />
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
