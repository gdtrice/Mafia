define([
    "models/player",
    "socket.io"
],
function (
    PlayerModel,
    io
    ) {
    return PlayerModel.extend({
        investigate: function(suspect) {
            this.socket = io();
            this.socket.on('investigate_registered', this._notifyResults.bind(this));
            this.socket.emit('investigate', {
                player: suspect.get('username'),
                gameId: this.get('gameId')
            });
        },

        _notifyResults: function(data) {
            // Unpack the data and return bool
            this.trigger('investigate_complete', data);
        }
    });
});
