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
    var el = document.getElementById('test');
    React.render(<ControllerView />, el);
});
