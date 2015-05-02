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
            // make this random
            this.set("id", 1);
        },

        setRole: function(role) {
            this.role = role;
        }
    });
});
