define([
    "models/player",
    "socket.io"
],
function (
    PlayerModel,
    io
    ) {
    return PlayerModel.extend({
        save: function(patient) {
            this.socket = io();
            this.socket.on('save_registered', this._notifyResults.bind(this));
            this.socket.emit('save', {
                player: patient.get('username'),
                gameId: this.get('gameId')
            });
        },

        _notifyResults: function(data) {
            this.trigger('save_complete', data);
        }
    });
});

