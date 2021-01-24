
import { useState } from "react";
import WhoToFollowDetailComponent from '../sections/whoToFollowDetail.component.js';

function ProfileHeaderComponent(props) {
    const [ modal, setModal ] = useState({
        type: undefined,
        content: []
    });

    function toggleModal(modalType) {
        const content = (modalType === 'Followers') ? props.followers : props.following;
        setModal({...modal, type: modalType, content: content});
    }
    
    return (
        <div className="card text-center">
            <div className="card-body">
                <div className="row justify-content-center my-3">
                    <img src="../static/assets/images/users/profile-pic.jpg" alt="user" className="rounded-circle" width={60}/>
                </div>
                <h3 className="card-title">{props.profile && 
                    (props.profile.first_name + ' ' + props.profile.last_name)}</h3>
                <h4 className="card-subtitle">{props.profile && `@${props.profile.username}`}</h4>
                <small className="badge badge-pill badge-info form-text text-white">{props.profile && props.profile.location}</small>
                <h6 className="card-text my-3">{props.profile && props.profile.bio}</h6>
                <div className="row justify-content-center my-3">
                    <a href="" className="col-2" data-toggle="modal" data-target="#scrollable-modal" onClick={() => toggleModal('Following')}>
                        <h2 className="text-dark mb-1 font-weight-small">{(props.profile && props.profile.following_count) || 0}</h2>
                        <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">Following</h6>
                    </a>
                    <a href="" className="col-2" data-toggle="modal" data-target="#scrollable-modal" onClick={() => toggleModal('Followers')}>
                        <h2 className="text-dark mb-1 font-weight-small">{(props.profile && props.profile.follower_count) || 0}</h2>
                        <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">Followers</h6>
                    </a>
                </div>
            </div>
            {/* Modal */}
            <div className="modal fade text-left" id="scrollable-modal" tabIndex={-1} role="dialog" aria-labelledby="scrollableModalTitle" aria-hidden="true" style={{display: 'none'}}>
                <div className="modal-dialog modal-dialog-scrollable" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="scrollableModalTitle">{modal.type && modal.type}</h5>
                        <button type="button" onClick={toggleModal} className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className='row'>
                            {modal.content && modal.content.map(item => {
                                return <WhoToFollowDetailComponent profile={item} key={item.user_id}/>
                            })}
                        </div>
                    </div>
                    </div>  {/* /.modal-content */}
                </div>{/* /.modal-dialog */}
                </div>
            </div>

    )
}

export default ProfileHeaderComponent;