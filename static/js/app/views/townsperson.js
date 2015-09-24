define([
    "react",
    "views/role_mixin"
],
function (
    React,
    RoleMixin
    ) {
    return React.createClass({
        mixins: [RoleMixin],

        getInitialState: function() {
            return this.DEFAULT_STATE;
        },

        render: function() {
            return this.getViewForRender();
        }
    });
});
