requirejs.config({
    baseUrl: "static/js/",

    paths: {
        // external libraries
        jquery: 'external/jquery-1.11.2.min',
        backbone: "external/backbone-min",
        underscore: "external/underscore-min",
        react: "external/react-with-addons",

        // app
        app: "app",

        // models
        "models/player" : "app/models/player",
        "models/user" : "app/models/user",
        "models/narrator" : "app/models/narrator",
        "models/game_config" : "app/models/game_config",
        "models/game" : "app/models/game",

        // views
        "views/config" : "build/views/config",
        "views/controller" : "build/views/controller",
    }
});

requirejs(["build/main"]);
