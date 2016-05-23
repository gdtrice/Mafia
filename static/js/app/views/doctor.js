define([
    "react",
    "models/doctor",
    "views/day_council",
    "views/player_picker_list",
    "views/role_mixin"
],
function (
    React,
    DoctorModel,
    DayCouncilView,
    PlayerPickerListView,
    RoleMixin
    ) {
    return React.createClass({
        mixins: [RoleMixin],

        componentDidMount: function() {
            this.doctor = new DoctorModel({
                player: this.props.currentPlayer.attributes,
                gameId: this.props.game.get('_id')
            });

            this.doctor.on('doctor_action', this._renderNightAction);
            this.doctor.on('save_complete', this._renderRoleActionResults);
        },

        getInitialState: function() {
            return this.DEFAULT_STATE;
        },

        savePlayerLife: function(player) {
            this.doctor.save(player);
        },

        render: function() {
            var nightActionElement = (
                <div>
                    <div> Its night time player...save someones life! </div>
                    <PlayerPickerListView players={ this.props.game.getActivePlayers() } onPlayerSelected={ this.savePlayerLife } />
                </div>
            );

            return this.getViewForRender(nightActionElement, 'save_done');
        }
    });
});
