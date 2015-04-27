define([
    "models/user",
    "models/game"
],
function (
    User,
    Game
    ) {
    return User.extend({
        initialize: function() {
            this.game = new GameModel(this.get("username"));
        },
        startGame: function() {
            return;
        },

        startVote: function() {
            return;
        },

        peakForDeath: function() {
            return;
        },

        showDeath: function() {
            return;
        }
    });
});

