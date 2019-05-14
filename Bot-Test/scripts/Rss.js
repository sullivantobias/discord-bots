/**
 * @class Rss
 */
const Twitter = require('twitter');
const request = require('request');
const { twitterConfig, youtubeConfig } = require('../data/fluxConfig')
const { Config } = require('../data/youtubeChannelsConfig')

class Rss {
    constructor(bot) {
        this.bot = bot;
        this.lastTweet = ''
        this.lastYoutubeVideo = {
            channelTitle: '',
            videoId: ''
        }
    }

    getTwitterFlux() {
        const twitterFlux = this.bot.channels.find(
            channel => channel.id === "572904579566403586" || channel.id === "577400706508521482"
        );

        var T = new Twitter(twitterConfig);
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

                    this.checkAndSend(twitterFlux, this.lastTweet)
                } else {
                    console.log(err);
                }
            })
        }
        setInterval(fluxRSS, 1000 * 60 * 2)
        //1000 * 60 * 60 *1.5
    };

    getYoutubeFlux() {
        const youtubeFlux = this.bot.channels.find(
            channel => channel.id === "573111433630580736" || channel.id === "577830161295081473"
        );

        for (const channel in Config) {
            request(`https://www.googleapis.com/youtube/v3/search?key=${youtubeConfig}&channelId=${Config[channel]}&part=snippet,id&order=date&maxResults=1`, (error, response, body) => {
                if (!error) {
                    console.log(body)
                    const jsonResponse = JSON.parse(body)

                    jsonResponse.items.forEach(element => {
                        Object.assign(this.lastYoutubeVideo, { channelTitle: element.snippet.channelTitle, videoId: element.id.videoId });
                    });

                    const urlVideo = `**Author: ${this.lastYoutubeVideo.channelTitle}** http://www.youtube.com/watch?v=${this.lastYoutubeVideo.videoId}`
                    this.checkAndSend(youtubeFlux, urlVideo)
                }
            });
        }
    }

    checkAndSend(channel, url) {
        let allMessages = [];
        channel.fetchMessages().then(messages => {
            messages.forEach(item => {
                allMessages.push(item.content)
            })
            const isExist = allMessages.includes(url)

            if (!isExist) channel.send(url)
        })
            .catch(console.error);
    }
}

module.exports.Rss = Rss;