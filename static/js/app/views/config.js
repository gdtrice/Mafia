define([
    "react",
    "underscore",
    "models/game_config",
    "models/player"
],
function (
    React,
    _,
    GameConfig,
    PlayerModel
    ) {
    return React.createClass({
        IMAGES: [
            "https://pbs.twimg.com/profile_images/450834967166070784/QeQgc7ZF_400x400.jpeg",
            "https://pbs.twimg.com/profile_images/585565077207678977/N_eNSBXi_400x400.jpg",
            "https://pbs.twimg.com/profile_images/566325718330511360/ggWoZsVl_400x400.jpeg",
            "https://pbs.twimg.com/profile_images/378800000189727654/ab49635c2ea63d32c066c899e21fa8ce_400x400.jpeg",
            "https://pbs.twimg.com/profile_images/581580930520727552/hE2LErp8_400x400.jpg",
            "https://pbs.twimg.com/profile_images/543489020508921856/hM1FwyAO_reasonably_small.jpeg",
            "http://weknowmemes.com/wp-content/uploads/2012/06/i-feel-it.jpg",
            "http://static.comicvine.com/uploads/original/5/50639/3377081-walter+white.jpg",
            "http://www.adweek.com/files/blogs/old-spice-terry-crews-brain-explodes.jpg",
            "http://s3.jspenguin.org/dodgeball_fran.jpeg",
            "http://i0.kym-cdn.com/photos/images/facebook/000/017/382/1250991947631.jpg",
            "https://pbs.twimg.com/media/CEGlLktUEAA-eVD.jpg",
        ],

        componentDidMount: function() {
            this.gameConfig = new GameConfig();
        },

        joinGame: function(e) {
            e.preventDefault();

            // creating a fake username for now
            var username = "joinedUser" + this._randomness();
            var picture = _.sample(this.IMAGES); 
            var gameCode = React.findDOMNode(this.refs.gameCode).value.trim();
            var joinedGame = this.gameConfig.joinGame(gameCode, username, picture);

            if(_.isEmpty(joinedGame)){
                // error callback
            };
            var currentPlayer = new PlayerModel({username: username, picture: picture});
            this.props.onGameCodeRetrieved({game: joinedGame, currentPlayer: currentPlayer});
        },

        createGame: function(e) {
            e.preventDefault();

            // creating a fake username for now
            var username = "creatorUser" + this._randomness();
            var picture = _.sample(this.IMAGES); 
            var self = this;
            this.gameConfig.createGame(username, picture, {
                                       success: function(game) {
                                           var currentPlayer = new PlayerModel({username: username, picture: picture});
                                           self.props.onGameCodeRetrieved({game: game, currentPlayer: currentPlayer});
                                       },
                                       error: function() {
                                           console.log("View recieved an error");
                                   }
            });
        },

        render: function() {
            return (
                <div>
                    <form onSubmit={this.createGame}>
                        <input type="submit" value="New Game" />
                    </form>
                    <form onSubmit={this.joinGame}>
                        Join room: <input type="text" placeholder="enter room id..." ref="gameCode" />
                        <input type="submit" value="Join" />
                    </form>
                </div>
            );
        },

        _randomness: function() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
        }
    });
});
