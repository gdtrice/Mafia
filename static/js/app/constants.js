define([
    "underscore"
],
function (
    _
    ) {
    return {
        NIGHT_DELAY: 4000, 
        GAME_TYPES: {
            NEW: 'new',
            EXISTING: 'existing',
            UNKNOWN: 'unknown'
        },
        PLAYER_MINIMUM: 4, // TODO: 4 is the minimum amount of players that are necessary to play.
    };
});
