define([
    "underscore",
    "backbone",
    "react",
    "models/game_config"
],
function (
    _,
    Backbone,
    React,
    GameConfig
    ) {
    var gc = new GameConfig();
    var code = gc.createGame("eqre");
    p1Game = gc.joinGame(code, "newUserHere");
    p2Game = gc.joinGame(code, "newUserHere2");
    p1Game.startGame();
    var el = document.getElementById('test');
    console.log(el);
    React.render(<div>hello world</div>, el);
});
