define([
    "underscore",
    "backbone",
    "models/game_config"
],
function (
    _,
    Backbone,
    GameConfig
    ) {
    var gc = new GameConfig();
    var code = gc.createGame("eqre");
    p1Game = gc.joinGame(code, "newUserHere");
    p2Game = gc.joinGame(code, "newUserHere2");
});

