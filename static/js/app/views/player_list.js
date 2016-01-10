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
            this.props.players.each(function(item) {
                playerItems.push(<PlayerItemView key={item.get('username')} player={ item } />);
            });

            return (
                <div>
                    { playerItems }
                </div>
            );
        }
    });
});
