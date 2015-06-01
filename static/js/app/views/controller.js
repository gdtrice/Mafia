define([
    "underscore",
    "react",
    "views/config"
],
function (
    _,
    React,
    ConfigView
    ) {
    return React.createClass({
        getInitialState: function() {
            return {gameCode: ""};
        },

        loadGameView: function(gameCode) {
            this.setState({gameCode: gameCode});
        },

        render: function() {
            if (!_.isEmpty(this.state.gameCode)) {
                return (<div> Game Code Recieved! {this.state.gameCode} </div>);
            } 
            return (
                <ConfigView onGameCodeRetrieved={this.loadGameView}/>
            );
        }
    });
});

