import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";
import AuthService from '../services/auth.service.js';

function LoginComponent() {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = data => {
    const { username, password } = data;
    AuthService.login(username, password).then((response) => {
      if (!response.error) {
        history.push('/home');
        window.location.reload();
      } else {
        setErrorMessage(response.message);
        console.log('errorMessage',errorMessage);
      }
    }).catch((error) => {
      alert(error);
    })
  }

  const cleanErrorMessage = () => setErrorMessage('');

  return (
      <div className="auth-wrapper d-flex no-block justify-content-center align-items-center position-relative">
      <div className="auth-box row" style={{maxWidth:'400px'}}>
        <div className="col-lg-12 col-md-12 bg-white">
          <div className="p-3">
            <div className="text-center">
              <img src="./logo192.png" style={{height:'5rem',width:'auto'}} alt="wrapkit" />
            </div>
            <h2 className="mt-3 text-center">Sign In</h2>
            <p className="text-center">Enter your username and password to sign in. For demo account username: demo password: demo</p>
            <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group">
                    <label className="text-dark" htmlFor="uname">Username</label>
                    <input 
                      className="form-control" 
                      id="uname" 
                      name="username"
                      type="text" 
                      placeholder="enter your username"
                      onChange={cleanErrorMessage}
                      ref={register({ 
                        required: {
                          value: true,
                          message: "Enter your username"
                        }})}/>
                      {(errors.username && errors.username.message &&
                      <span className="text-danger">{errors.username.message}</span>) || 
                      (errorMessage && <span className="text-danger">{errorMessage}</span>)}
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label className="text-dark" htmlFor="pwd">Password</label>
                    <input 
                      className="form-control" 
                      id="pwd" 
                      name="password"
                      type="password" 
                      placeholder="enter your password"
                      onChange={cleanErrorMessage}
                      ref={register({ 
                        required: {
                          value: true,
                          message: "Enter your password"
                        }})}/>
                      {errors.password && errors.password.message &&
                      <span className="text-danger">{errors.password.message}</span>}
                  </div>
                </div>
                <div className="col-lg-12 text-center">
                  <button type="submit" className="btn btn-block btn-dark">Sign In</button>
                </div>
                <div className="col-lg-12 text-center mt-5">
                  Don't have an account? <Link to="/register" className="text-danger">Sign Up</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>          
  );
}

export default LoginComponent;