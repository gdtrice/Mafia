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
        getInitialState: function() {
            return {disabled: false};
        },
        disablePicker: function(player) {
            //show spinner and call the callback
            this.setState({disabled: true});
            this.props.onPlayerSelected(player);
        },
        render: function() {
            if (this.state.disabled) {
                return (
                    <div> this is a spinner </div>
                );
            }

            var playerItems = [];
            var self = this;
            _.each(this.props.players, function(item) {
                playerItems.push(<PlayerPickerItemView key={item.get('username')} player={ item } onPlayerSelected={ self.disablePicker }/>);
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
