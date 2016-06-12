define([
    "backbone"
],
function (
    Backbone
    ) {
    return Backbone.Model.extend({
        parse: function(json) {
            var data = {};
            data.gameId = json.game_id;
            data.createDate = json.create_date;
            data.playerInvestigated = json.night_data.player_investigated;
            data.playerKillTarget = json.night_data.player_kill_target;
            data.playerSaveTarget = json.night_data.player_save_target;
            data.dayData = json.day_data;
            return json;
        },
    });
});
