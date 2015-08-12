define([
    "backbone",
    "underscore",
    "models/game"
],
function (
    Backbone,
    _,
    Game
    ) {
    return Backbone.Collection.extend({
        url: '/games',
        model: Game,

        initialize: function(id) {
            // make a backbone collection of users?
            this.roles = ["mafia", "townsperson", "doctor"];
            this.players = [];
            this.id = id;
        },

        // TODO: make callbacks and options dict
        createNewGame: function(gameModel, successCb, errorCb) {
            if(_.isEmpty(gameModel)) {
                console.log("gameModel is empty or undefined, game could not be created");
                return;
            }

            this.create(gameModel, { 
                    wait: true, // wait for server to respond
                    success: successCb, 
                    error: errorCb
            }); 
        },

        joinGame: function(gameCode, username, picture, successCb, errorCb) {
            if(_.isEmpty(gameCode) || _.isEmpty(username)) {
                console.log("gameCode or username is empty or undefined, game could not be joined");
                return;
            }

            // TODO: need a better way to query for the game
            var game = new this.model({_id: gameCode});
            game.fetch({async: false});
            game.addPlayer(username, picture);
            return game;
        }
    });
});
