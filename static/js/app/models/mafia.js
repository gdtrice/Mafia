define([
    "models/player",
    "socket.io"
],
function (
    PlayerModel,
    io
    ) {
    return PlayerModel.extend({
        kill: function(target) {
            this.socket = io();
            this.socket.on('kill_registered', this._notifyResults.bind(this));
            this.socket.emit('kill', {
                player: target.get('username'),
                gameId: this.get('gameId')
            });
        },

        _notifyResults: function(data) {
            this.trigger('kill_complete', data);
        }
    });
});
