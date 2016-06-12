define([
    "backbone"
],
function (
    Backbone
    ) {
    return Backbone.Model.extend({
        urlRoot: '/vote',
        idAttribute: '_id',

        vote: function(player){
            this.set('nominee', player);
            this.save();
        }
    });
});
