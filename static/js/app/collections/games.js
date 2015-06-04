define([
    "backbone",
    "underscore",
    "models/narrator",
    "models/game"
],
function (
    Backbone,
    _,
    NarratorModel,
    Game
    ) {
    return Backbone.Collection.extend({
        url: 'http://localhost:3000/games',
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
            var game = this._getGame(gameCode);
            game.addPlayer(username, picture);
            return game;
            // db.gamecollection.update({_id: ObjectId("556c24e75a35f88f16f5668a")}, {$push: { players: { name: "newGuy", picture: "newguy.jpg.to"}}});
        },

        // Hacky way to get a specific game until sever querying gets enabled
        _getGame: function(id) {
            this.fetch({async: false});
            return this.findWhere({"_id": id});
        }
    });
});
