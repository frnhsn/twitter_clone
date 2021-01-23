import { useState } from "react";
import UserService from '../../services/user.service.js';

const separator = {
    borderTop: "1px solid var(--light)",
  };

function WhoToFollowDetailComponent(props) {
    const [followState, setFollowState] = useState(props.profile.already_followed);
    const [followStyle, setFollowStyle] = useState((props.profile.already_followed && 'btn-success') || 'btn-primary');
    const [followCaption, setFollowCaption] = useState((props.profile.already_followed && 'Following') || 'Follow');

    function handleFollow() {
        // Unfollow profile
        if (followState) {
            UserService.unfollowProfile(props.profile.username).then(response => {
                if (!response.error) {
                    setFollowStyle('btn-primary');
                    setFollowCaption('Follow');
                    setFollowState(response.data.already_followed);
                }
            });
            
        // Follow profile
        } else {
            UserService.followProfile(props.profile.username).then(response => {
                if (!response.error) {
                    setFollowStyle('btn-success');
                    setFollowCaption('Following');
                    setFollowState(response.data.already_followed);
                }
            });
        }
    }

    return (
        <div className="card-body" style={separator}>
            {/* Tweet content */}
            <div className="row">
            <div className="col-3">
                <img src="../assets/images/users/profile-pic.jpg" alt="user" className="rounded-circle" width={60}/>
            </div>
            <div className="col-5">
                <h5 className="text-dark"><a href={"profile/" + props.profile.username}>{
                    props.profile.first_name + ' ' + props.profile.last_name
                }</a></h5>
                <h5 className="text-dark">@{props.profile.username}</h5>    
            </div>
            <div className="col-4 text-center mx-0">
                <button className={followStyle + " btn btn-rounded"} onClick={handleFollow}>{followCaption}</button>
            </div>
        </div>
    </div>
    )
}

export default WhoToFollowDetailComponent;