define([
    "backbone"
],
function (
    Backbone
    ) {
    return Backbone.Model.extend({
        defaults: function() {
                return {
                    username: "Empty Username",
                    picture: "Insert url to default pic",
                    id: null
                }
        },
        initialize: function() {
        },

        setRole: function(role) {
            this.role = role;
        }
    });
});
