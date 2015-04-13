define([
    "backbone",
    "models/narrator",
    "models/user"
],
function (
    Backbone,
    NarratorModel,
    UserModel
    ) {
    return Backbone.Model.extend({
        initialize: function(username) {
            this.users = [];
            this.narrator = new Narrator(){ username: username };

            // TODO (gtrice): make this random.
            this.gameCode = "abcde";
        },

        addPlayer: function(username) {
            this.users.push = new User(){ username: username };
        }
    });
});

