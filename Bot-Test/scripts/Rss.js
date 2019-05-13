/**
 * @class Rss
 */
const Twitter = require('twitter');

class Rss {
    constructor(bot) {
        this.bot = bot;
        this.lastTweet = ''
    }

    getFlux(config) {
        const flux = this.bot.channels.find(
            channel => channel.id === "572904579566403586"
        );

        var T = new Twitter(config);
        // Initiate your search using the above paramaters
        const fluxRSS = () => {
            T.get('https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=WavenFR&count=1', (err, response) => {
                // If there is no error, proceed
                if (!err) {
                    // Loop through the returned tweets
                    for (let i = 0; i < response.length; i++) {
                        let username = response[i].user.screen_name;
                        let tweetId = response[i].id_str;
                        this.lastTweet = `https://twitter.com/${username}/status/${tweetId}`
                    }

                    flux.fetchMessages({ limit: 1 }).then(messages => {
                        const lastMessage = messages.first();
                        if (this.lastTweet !== lastMessage.content) {
                            flux.send(this.lastTweet)
                        }
                    })
                        .catch(console.error);
                } else {
                    console.log(err);
                }
            })
        }
        setInterval(fluxRSS, 1000 * 60)
    };
}

module.exports.Rss = Rss;