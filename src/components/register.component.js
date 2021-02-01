import React, { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";

import AuthService from '../services/auth.service.js';

function RegisterComponent() {
  const { register, handleSubmit, watch, errors } = useForm();
  const password = useRef({});
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState({
    username: "",
    email: "",
    password: ""
  });
  password.current = watch("password", "");

  const onSubmit = data => {
    const {username, email, first_name, last_name, password, retype_password: re_password} = data;

    AuthService.register(username, email, first_name, last_name, password, re_password).then(response => {
        if (!response.error) {
          // If login success, it will be redirected to homepage. Else to login page
          AuthService.login(username, password).then(() => {
            history.push('/home');
            window.location.reload();
          }).catch((error) => {
            history.push('/login');
            window.location.reload();
          })
        } 
        // If user posts bad input data, a message will be displayed according to its field
        else {
          console.log(response.message);
          if (response.message.field === 'username') { 
            setErrorMessage(values => ({...values, username: response.message.value})) 
          };
          if (response.message.field === 'email') { 
            setErrorMessage(values => ({...values, email: response.message.value})) 
          };
          if (response.message.field === 'password') { 
            setErrorMessage(values => ({...values, password: response.message.value})) 
           };
        }
        console.log(errorMessage);
      }
    ).catch(error => {
      alert(error);
    });
  };

  const cleanErrorMessage = () => setErrorMessage({username: "", email: "", password: ""});

    return (
        <div className="auth-wrapper d-flex no-block justify-content-center align-items-center position-relative">  
        <div className="auth-box row" style={{maxWidth:'400px'}}>
          <div className="col-lg-12 col-md-12 bg-white">
            <div className="p-3">
              <div className="text-center">
                <img src="/static/logo192.png" style={{height:'5rem',width:'auto'}} alt="wrapkit" />
              </div>
              <h2 className="mt-3 text-center">Sign Up</h2>
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
                              message: "This field is required"
                            }, minLength: {
                              value: 6,
                              message: "Username must have at least 6 characters"
                            }, maxLength: {
                              value: 20,
                              message: "Username cannot exceed 20 characters long"
                            }})}/>
                          {(errors.username && errors.username.message &&
                          <span className="text-danger">{errors.username.message}</span>) || 
                          (errorMessage.username && <span className="text-danger">{errorMessage.username}</span>)}
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label className="text-dark" htmlFor="email">Email</label>
                        <input 
                          className="form-control"
                          id="email" 
                          name="email"
                          type="email" 
                          placeholder="enter your email address"
                          onChange={cleanErrorMessage} 
                          ref={register({ 
                            required: {
                              value: true,
                              message: "This field is required"
                            }, pattern: {
                              value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                              message: "Please enter valid email"
                            }})}/>
                          {(errors.email && errors.email.message &&
                          <span className="text-danger">{errors.email.message}</span>) || 
                          (errorMessage.email && <span className="text-danger">{errorMessage.email}</span>)}
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label className="text-dark" htmlFor="firstname">First Name</label>
                        <input 
                          className="form-control"
                          id="firstname" 
                          name="first_name"
                          type="text" 
                          placeholder="enter your first name" 
                          ref={register({ 
                            required: {
                              value: true,
                              message: "This field is required"
                            }, minLength: {
                              value: 2,
                              message: "First name must have at least 6 characters"
                            }, maxLength: {
                              value: 25,
                              message: "First name cannot exceed 25 characters long"
                            }})}/>
                          {errors.first_name && errors.first_name.message &&
                          <span className="text-danger">{errors.first_name.message}</span>}

                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label className="text-dark" htmlFor="lastname">Last Name</label>
                        <input 
                          className="form-control"
                          id="lastname" 
                          name="last_name"
                          type="text" 
                          placeholder="enter your last name" 
                          ref={register({ 
                            required: {
                              value: true,
                              message: "This field is required"
                            }, minLength: {
                              value: 2,
                              message: "Last name must have at least 2 characters"
                            }, maxLength: {
                              value: 25,
                              message: "Last name cannot exceed 25 characters long"
                            }})}/>
                          {errors.last_name && errors.last_name.message &&
                          <span className="text-danger">{errors.last_name.message}</span>}
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
                              message: "You must specify a password"},
                            minLength: {
                              value: 6,
                              message: "Password must have at least 6 characters"
                            }})}/>
                          {(errors.password && errors.password.message &&
                          <span className="text-danger">{errors.password.message}</span>) ||
                          (errorMessage.password && <span className="text-danger">{errorMessage.password}</span>)}
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label className="text-dark" htmlFor="re-pwd">Retype Password</label>
                        <input 
                          className="form-control"
                          id="re-pwd"
                          name="retype_password"
                          type="password" 
                          placeholder="enter your password again" 
                          ref={register({
                            validate: value =>
                              (value === password.current || "The passwords didn't match") 
                          })}/>
                          {errors.retype_password && errors.retype_password.message &&
                          <span className="text-danger">{errors.retype_password.message}</span>}
                      </div>
                    </div>
                    <div className="col-lg-12 text-center">
                      <button type="submit" className="btn btn-block btn-dark" disabled={false}>Sign Up</button>

                    </div>
                  <div className="col-lg-12 text-center mt-5">
                    Already have an account? <Link to="/login" className="text-danger">Sign In</Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>          
    );
}

export default RegisterComponent;