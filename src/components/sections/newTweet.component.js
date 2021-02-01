
import { useState } from "react";

function NewTweetComponent(props) {
    const [inputText, setInputText] = useState('');
    const [disabledButton, setDisabledButton] = useState(true);

    function handleChange(e) {
        setInputText(e.target.value);
        if (inputText.length >= 10) {
            setDisabledButton(false);
        } else {
            setDisabledButton(true);
        }
    };

    function handleSubmit(event) {
        event.preventDefault();
        props.handleNewTweet(inputText);
        setInputText('');
    }
    return (
        <div className="card">
            <div className="card-body">
            <form onSubmit={handleSubmit}>
                {/* Tweet content */}
                <div className="row">
                <div className="col-1 mr-3">
                    <img src="/static/assets/images/users/profile-pic.jpg" alt="user" className="rounded-circle" width={60}/>
                </div>
                <div className="col-10">
                    <textarea 
                        className="form-control" 
                        rows="3" 
                        placeholder="What's on your mind?" 
                        minLength="10"
                        maxLength="255"
                        value={inputText}
                        onChange={handleChange}
                        style={{border:"none",outline:"none",overflow:"auto",resize:"none"}}
                        />
                    <small id="textHelp" className="form-text text-muted">{(inputText.length || 0) + " / 255"}</small>
                </div>
                </div>
                {/* Tweet button */}
                <div className="row justify-content-end px-3 my-2">
                    <button 
                        type="submit"
                        className="btn btn-rounded btn-primary mr-3"
                        disabled={disabledButton}
                    >Tweet</button>
                </div>
            </form>

        </div>
    </div>
    )
}

export default NewTweetComponent;