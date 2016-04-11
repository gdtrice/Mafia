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
            this.socket.on('investigate_registered', this._notifyResults.bind(this));
            this.socket.on('detective_action', this._notifyNightAction.bind(this));
        },

        investigate: function(suspect) {
            this.socket.emit('investigate', {
                player: suspect.get('username'),
                gameId: this.get('gameId')
            });
        },

        _notifyResults: function(data) {
            // Unpack the data and return bool
            this.trigger('investigate_complete', data);
        },

        _notifyNightAction: function() {
            this.trigger('detective_action');
        }
    });
});
