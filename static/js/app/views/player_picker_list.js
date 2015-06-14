define([
    "react",
    "underscore",
    "views/player_picker_item"
],
function (
    React,
    _,
    PlayerPickerItemView
    ) {
    return React.createClass({
        render: function() {
            var playerItems = [];
            this.props.players.each(function(item) {
                playerItems.push(<PlayerPickerItemView key={item.get('username')} player={ item } />);
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

