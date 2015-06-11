requirejs.config({
    baseUrl: "static/js/",

    paths: {
        // external libraries
        jquery: 'external/jquery-1.11.2.min',
        backbone: "external/backbone-min",
        underscore: "external/underscore-min",
        react: "external/react-with-addons",
        "socket.io": "../../socket.io/socket.io",

        // app
        app: "app",

        // models
        "models/player" : "app/models/player",
        "models/user" : "app/models/user",
        "models/narrator" : "app/models/narrator",
        "models/game_config" : "app/models/game_config",
        "models/game" : "app/models/game",

        // collections
        "collections/games" : "app/collections/games",
        "collections/players": "app/collections/players",

        // views
        // pointing to build for react jsx compiled files
        "views/config" : "build/views/config",
        "views/controller" : "build/views/controller",
        "views/game_room" : "build/views/game_room",
        "views/player_list" : "build/views/player_list",
        "views/mafia" : "build/views/mafia",
        "views/detective" : "build/views/detective",
        "views/townsperson" : "build/views/townsperson",
        "views/player_item" : "build/views/player_item"
    }
});

requirejs(["build/main"]);
