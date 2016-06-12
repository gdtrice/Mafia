define([
    "backbone",
    "underscore",
    "models/game",
    "collections/games"
],
function (
    Backbone,
    _,
    Game,
    Games
    ) {

    return Backbone.Model.extend({
        initialize: function() {
            this.games = new Games();
        },

        createGame: function(user, options) {
            // TODO: This should be in Game model...
            var newGame = {
                "createdBy" : user.get('username'),
                "players": [
                        {
                            "username": user.get('username'),
                            "picture": user.get('picture')
                        }
                ]
            };

            var _options = options;
            var createdGame = this.games.createNewGame(newGame,
                                function(resp, status) {
                                    console.log("Game create successfully");
                                    _options.success(resp);
                                },
                                function(resp, status) {
                                    console.log("Error!");
                                    _options.error(resp, status);
                                }
                            ); 
        },

        joinGame: function(gameCode, user) {
            return this.games.joinGame(gameCode, user);
        },

    });
});
