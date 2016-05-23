define([
    "react",
    "models/mafia",
    "views/player_picker_list",
    "views/role_mixin"
],
function (
    React,
    MafiaModel,
    PlayerPickerListView,
    RoleMixin
    ) {
    return React.createClass({
        mixins: [RoleMixin],

        componentDidMount: function() {
            this.mafia = new MafiaModel({
                player: this.props.currentPlayer.attributes,
                gameId: this.props.game.get('_id')
            });

            this.mafia.on('mafia_action', this._renderNightAction);
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
                    <PlayerPickerListView players={ this.props.game.getActivePlayers() } onPlayerSelected={ this.killPlayer } />
                </div>
            );

            return this.getViewForRender(nightActionElement, 'kill_done');
        }
    });
});
