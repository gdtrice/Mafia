requirejs.config({
    baseUrl: "static/js/",

    paths: {
        // external libraries
        jquery: 'external/jquery-1.11.2.min',
        backbone: "external/backbone-min",
        underscore: "external/underscore-min",

        // app
        app: "app",
        "models/player" : "app/models/player",
        "models/user" : "app/models/user",
        "models/narrator" : "app/models/narrator",
        "models/game_config" : "app/models/game_config",
        "models/game" : "app/models/game"
        
    }
});

requirejs(["app/main"]);
