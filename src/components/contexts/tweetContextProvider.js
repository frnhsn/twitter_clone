import { Component } from 'react';
import TweetContext from './tweetContext.js';

class TweetContextProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tweets: this.props.tweets || [],
        };
        console.log('props',this.props)
        console.log('providers',this.state.tweets)
    };

    setTweets = (tweets) => {
        this.setState({tweets});
    };

    pushTweet = (tweet) => {
        this.setState({
            tweets: [tweet, ...this.state.tweets],
        })
    };

    removeTweet = (tweetId) => {
        this.setState({
            tweets: this.state.tweets.filter(tweet => tweet.id === tweetId)
        });
    };

    render() {
        return (
            <TweetContext.Provider
                value={{
                    tweets: this.state.tweets,
                    setTweets: this.setTweets,
                    pushTweet: this.pushTweet,
                    removeTweet: this.removeTweet
                }}
            >
                {this.props.children}
            </TweetContext.Provider>
        )
    }
};

export default TweetContextProvider;