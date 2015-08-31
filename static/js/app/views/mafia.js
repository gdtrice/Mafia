define([
    "react",
    "underscore",
    "socket.io",
    "constants",
    "models/mafia",
    "views/player_picker_list",
    "views/role_mixin",
    "views/night_wait"
],
function (
    React,
    _,
    io,
    CONSTANTS,
    MafiaModel,
    PlayerPickerListView,
    RoleMixin,
    NightWaitView
    ) {
    return React.createClass({
        mixins: [RoleMixin],

        componentDidMount: function() {
            this.mafia = new MafiaModel({
                player: this.props.currentPlayer.attributes,
                gameId: this.props.game.get('_id')
            });

            this.socket.on('mafia_action', this._renderNightAction);
            this.mafia.on('kill_complete', this._renderRoleActionResults);
        },

        getInitialState: function() {
            return this.DEFAULT_STATE;
        },

        killPlayer: function(player) {
            this.mafia.kill(player);
        },

        render: function() {
            var nightActionElement = (
                <div>
                    <div> Its night time player...who do you want to kill? </div>
                    <PlayerPickerListView players={ this.props.game.get('players') } onPlayerSelected={ this.killPlayer } />
                </div>
            );

            return this.getViewForRender(nightActionElement, 'kill_done');
        }
    });
});
