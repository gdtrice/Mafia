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
            this.gameCount = this.MAX_GAMES;
            this.usedGameCodes = [];
//            this.games = [];
            this.games = new Games();
        },

        createGame: function(username, picture, options) {
            /*this.gameCount--;
            this.usedGameCodes.push(this.gameCount);
            return this.gameCount;*/
            
            // TODO: This should be in Game model...
            var newGame = {
                "createDate": "test",
                "startDate" : "test2",
                "endDate"   : "test3",
                "createdBy" : username,
                "players": [
                        {
                            "name": username,
                            "picture": picture
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

        joinGame: function(gameCode, username, picture) {
            return this.games.joinGame(gameCode, username, picture);
        },

    });
});
