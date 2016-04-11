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
            this.socket.on('save_registered', this._notifyResults.bind(this));
            this.socket.on('doctor_action', this._notifyNightAction.bind(this));
        },

        save: function(patient) {
            this.socket.emit('save', {
                player: patient.get('username'),
                gameId: this.get('gameId')
            });
        },

        _notifyResults: function(data) {
            this.trigger('save_complete', data);
        },

        _notifyNightAction: function() {
            this.trigger('doctor_action');
        }
    });
});

