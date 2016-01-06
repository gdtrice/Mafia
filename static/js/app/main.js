define([
    "underscore",
    "backbone",
    "react",
    "models/game_config",
    "views/controller"
],
function (
    _,
    Backbone,
    React,
    GameConfig,
    ControllerView
    ) {

    var el = document.getElementById('game-container');
    React.render(
        <ControllerView />, el
    );
});
