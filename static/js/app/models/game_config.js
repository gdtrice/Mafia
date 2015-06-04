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

    // Mocking some the service for now...
    return Backbone.Model.extend({
        MAX_GAMES: 100,
        IMAGES: [
            "https://pbs.twimg.com/profile_images/450834967166070784/QeQgc7ZF_400x400.jpeg",
            "https://pbs.twimg.com/profile_images/585565077207678977/N_eNSBXi_400x400.jpg",
            "https://pbs.twimg.com/profile_images/566325718330511360/ggWoZsVl_400x400.jpeg",
            "https://pbs.twimg.com/profile_images/378800000189727654/ab49635c2ea63d32c066c899e21fa8ce_400x400.jpeg",
            "https://pbs.twimg.com/profile_images/581580930520727552/hE2LErp8_400x400.jpg",
            "https://pbs.twimg.com/profile_images/543489020508921856/hM1FwyAO_reasonably_small.jpeg"
        ],

        initialize: function() {
            this.gameCount = this.MAX_GAMES;
            this.usedGameCodes = [];
//            this.games = [];
            this.games = new Games();
        },

        createGame: function(username, options) {
            /*this.gameCount--;
            this.usedGameCodes.push(this.gameCount);
            return this.gameCount;*/
            
            var username = "testuser" + this._randomness();
            var picture = _.sample(this.IMAGES); 
            // TODO: This should be in Game model...
            var newGame = {
                "createDate": "test",
                "startDate" : "test2",
                "endDate"   : "test3",
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
            // TODO: need a better way to query for the game
            var username = "testuser" + this._randomness();
            var picture = _.sample(this.IMAGES); 
            var game = this.games.joinGame(gameCode, username, picture);
            return game;
        },

        _randomness: function() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
        }
    });
});
