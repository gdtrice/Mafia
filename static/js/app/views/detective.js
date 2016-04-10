define([
    "react",
    "models/detective",
    "views/player_picker_list",
    "views/role_mixin"
],
function (
    React,
    DetectiveModel,
    PlayerPickerListView,
    RoleMixin
    ) {
    return React.createClass({
        mixins: [RoleMixin],

        componentDidMount: function() {
            this.detective = new DetectiveModel({
                player: this.props.currentPlayer.attributes,
                gameId: this.props.game.get('_id')});

            this.detective.on('detective_action', this._renderNightAction);
            this.detective.on('investigate_complete', this._renderRoleActionResults);
        },

        getInitialState: function() {
            return this.DEFAULT_STATE;
        },

        investigatePlayer: function(suspect) {
            this.detective.investigate(suspect);
        },

        render: function() {
            var nightActionElement = (
                <div>
                    <div> Its night time player...who do you think the mafia is? </div>
                    <PlayerPickerListView players={ this.props.game.get('players') } onPlayerSelected={ this.investigatePlayer } />
                </div>
            );

            return this.getViewForRender(nightActionElement, 'investigate_done');
        }
    });
});
