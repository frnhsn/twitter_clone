import TweetDetailComponent from '../sections/tweetDetail.component.js';

function TweetListComponent(props) {
    return (
        <div className="card">
          {props.tweets && props.tweets.map(tweet => <TweetDetailComponent tweet={tweet} key={tweet.id}/>)}
        </div>
    )
}

export default TweetListComponent;