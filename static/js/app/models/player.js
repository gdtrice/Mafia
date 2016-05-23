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
                    isMe: False
                }
        },

        setRole: function(role) {
            this.role = role;
        }
    });
});
