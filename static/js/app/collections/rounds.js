define([
    "backbone",
    "underscore",
    "models/round"
],
function (
    Backbone,
    _,
    Round
    ) {
    return Backbone.Collection.extend({
        url: function() {
            return '/rounds/' + this.id;
        },
        model: Round,

        initialize: function(id) {
            this.id = id;
        }
    });
});

