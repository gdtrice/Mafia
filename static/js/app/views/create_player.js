define([
    "underscore",
    "react",
    "models/player"
],
function (
    _,
    React,
    PlayerModel
    ) {
    return React.createClass({
        IMAGES: [
            "static/images/sway-aint-got-the-answers.jpg",
            "static/images/i-feel-it.jpg",
            "static/images/3377081-walter+white.jpg",
            "static/images/old-spice-terry-crews-brain-explodes.jpg",
            "static/images/dodgeball_fran.jpeg",
            "static/images/1250991947631.jpg",
            "static/images/rtx1gzco.jpg",
            "static/images/top-funny-memes-06.jpg",
        ],

        createPlayer: function(e) {
            e.preventDefault();

            var picture = _.sample(this.IMAGES); 
            var username = React.findDOMNode(this.refs.username).value.trim();

            if (username.length < 4 || username.length > 25) {
                alert('Username must be between 4-25 characters!');
                return;
            }

            var currentPlayer = new PlayerModel({username: username, picture: picture});
            this.props.onPlayerCreated(currentPlayer);
        },

        render: function() {
            return (
                <div>
                    Name: <input type="text" placeholder="enter your name..." ref="username" />
                    <input className="btn btn-default" type="button" value="Go" onClick={this.createPlayer} />
                </div>
            );
        }
    });
});
