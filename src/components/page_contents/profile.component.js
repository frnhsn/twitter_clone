
import { useEffect, useState } from 'react';
import { User } from 'react-feather';
import ProfileHeaderComponent from '../sections/profileHeader.component.js';
import TweetListComponent from '../sections/tweetList.component.js';
import WhoToFollowListComponent from '../sections/whoToFollowList.component.js';
import UserService from '../../services/user.service.js';

function ProfileComponent(props) {
  const [ following, setFollowing ] = useState();
  const [ followers, setFollowers ] = useState();
  const [ user, setUser ] = useState();
  const [ userTweets, setUserTweets] = useState([]);

  useEffect(() => {
    if (props.username) {
      UserService.getProfile(props.username).then(response => {
        if (!response.error) {
          setUser(response.data);
          //  Fetch following list of the user
          UserService.following(props.username).then(response => {
            setFollowing(response.data);
          });
          // Fetch followers list of the user
          UserService.followers(props.username).then(response => {
            setFollowers(response.data);
          });
          // Fetch tweet list of a user
          UserService.getTweets(props.username).then(res => {
            if (!response.error) {
                setUserTweets(res.data);
                console.log(res.data);
            } else {
              alert(JSON.stringify(res.message));
            }
          }).catch(error => {
            alert(error);
          });
        } else {
          alert(JSON.stringify(response.message));
        } 
      }).catch(error => {
        alert(error);
      });
    }
  }, [])

  return (
    <div className="row p-4">
      <div className="col-md-8">
          <ProfileHeaderComponent profile={user} following={following} followers={followers}/>
          <TweetListComponent tweets={userTweets}/>
      </div>
      {/* Right sidebar */}
      <div className="right-sidebar col-md-4">
        <WhoToFollowListComponent/>
      </div>
    </div>
    )
}

export default ProfileComponent;
