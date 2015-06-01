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
            }

            this.create(gameModel, { 
                    wait: true, // wait for server to respond
                    success: successCb, 
                    error: errorCb
            }); 
        }
    });
});
