define([
    "models/player",
    "socket.io"
],
function (
    PlayerModel,
    io
    ) {
    return PlayerModel.extend({
        initialize: function() {
            this.socket = io();
            this.socket.on('kill_registered', this._notifyResults.bind(this));
            this.socket.on('mafia_action', this._notifyNightAction.bind(this));
        },
        kill: function(target) {
            this.socket.emit('kill', {
                player: target.get('username'),
                gameId: this.get('gameId')
            });
        },

        _notifyResults: function(data) {
            this.trigger('kill_complete', data);
        },

        _notifyNightAction: function() {
            this.trigger('mafia_action');
        }
    });
});
