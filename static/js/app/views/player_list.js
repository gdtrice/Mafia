define([
    "react",
    "underscore",
    "views/player_item"
],
function (
    React,
    _,
    PlayerItemView
    ) {
    return React.createClass({
        render: function() {
            var playerItems = [];
            _.each(this.props.players, function(item) {
                playerItems.push(<PlayerItemView player= { item } />);
            });

            return (
                <div>
                    <ul id="player-list">
                        { playerItems }
                    </ul>
                </div>
            );
        }
    });
});


