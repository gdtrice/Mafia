requirejs.config({
    baseUrl: "static/js/",

    paths: {
        // external libraries
        jquery: 'external/jquery-1.11.2.min',
        backbone: "external/backbone-min",
        underscore: "external/underscore-min",

        // app
        app: "app"
    }
});

requirejs(["app/main"]);
