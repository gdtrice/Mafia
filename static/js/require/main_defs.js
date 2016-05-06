requirejs.config({
    baseUrl: "static/js/",

    paths: {
        // external libraries
        jquery: "external/jquery-1.11.2.min",
        backbone: "external/backbone-min",
        underscore: "external/underscore-min",
        react: "external/react-with-addons",
        classnames: "external/classnames", // blessed by react to do classnames
        "socket.io": "../../socket.io/socket.io",

        app: "app",
        constants: "app/constants",

        // models
        "models/detective" : "app/models/detective",
        "models/doctor" : "app/models/doctor",
        "models/game_config" : "app/models/game_config",
        "models/game" : "app/models/game",
        "models/mafia" : "app/models/mafia",
        "models/player" : "app/models/player",
        "models/user" : "app/models/user",

        // collections
        "collections/games" : "app/collections/games",
        "collections/players": "app/collections/players",

        // views
        // pointing to build for react jsx compiled files
        "views/config" : "build/views/config",
        "views/controller" : "build/views/controller",
        "views/create_player" : "build/views/create_player",
        "views/day_council" : "build/views/day_council",
        "views/detective" : "build/views/detective",
        "views/doctor" : "build/views/doctor",
        "views/game_room" : "build/views/game_room",
        "views/kill_results" : "build/views/kill_results",
        "views/mafia" : "build/views/mafia",
        "views/night_wait" : "build/views/night_wait",
        "views/player_list" : "build/views/player_list",
        "views/player_picker_list" : "build/views/player_picker_list",
        "views/player_picker_item" : "build/views/player_picker_item",
        "views/player_item" : "build/views/player_item",
        "views/townsperson" : "build/views/townsperson",

        // mixins
        "views/role_mixin" : "build/views/role_mixin",
        "views/polling_mixin" : "build/views/polling_mixin",
    }
});

requirejs(["build/main"]);
