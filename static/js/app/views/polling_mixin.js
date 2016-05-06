define([
    "react",
    "underscore"
],
function (
    React,
    _
    ) {
    // Encapsulating the 'privates'
    var DEFAULT_POLL_INTERVAL = 3000; // 3 seconds
    return {
        POLL_INTERVAL: DEFAULT_POLL_INTERVAL, // override this to change polling interval
        POLL_FUNCTION: null,

        componentDidMount: function() {
            if (!_.isFunction(this.POLL_FUNCTION)) {
                throw 'You must set POLL_FUNCTION to use the polling mixin!';
            }
        },

        startPolling: function() {
            this._poll = setInterval(this.POLL_FUNCTION, this.POLL_INTERVAL);
        },

        stopPolling: function() {
            clearInterval(this._poll);
        },
    };
});
