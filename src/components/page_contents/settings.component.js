import React, { useState, useEffect, useRef } from 'react';
import { useForm } from "react-hook-form";
import UserService from '../../services/user.service.js';

function SettingsComponent(props) {
  const { register, handleSubmit, setValue, errors } = useForm();
  const [ submitted, setSubmitted ] = useState(false);
  const mounted = useRef();

  // useEffect(() => {
  //   if (!mounted.current) {
  //     // Component did mount
  //     updateForm();
  //     mounted.current = true;
  //     setSubmitted(false);
  //   } else {
  //     // Component did update
  //   }
  // }, []);


  useEffect(() => {
      updateForm();
      setSubmitted(false);
  }, []);


  const updateForm = () => {
    UserService.me().then(response => {
      if (!response.error) {
        setValue('first_name', response.data['first_name']);
        setValue('last_name', response.data['last_name']);
        setValue('location', response.data['location']);
        setValue('bio', response.data['bio']);
      }
    });
  }

  const onSubmit = data => {
    const {first_name, last_name, location, bio} = data;
    UserService.updateProfile(first_name, last_name, bio, location)
    .then(() => {
      updateForm();
      setSubmitted(true);
    }).catch(error => {
      alert(error);
    });
  }

  return (
    <div className="row p-4">
      <div className="col-lg-12 col-md-12 bg-white">
        <div className="p-3">
          <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              {/* First name field */}
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="text-dark" htmlFor="first_name">First Name</label>
                  <input 
                    className="form-control" 
                    id="first_name" 
                    name="first_name"
                    type="text" 
                    placeholder={"First Name"}
                    ref={register({ 
                      required: {
                        value: true,
                        message: "Enter your first name"
                      }})}/>
                    {errors.first_name && errors.first_name.message &&
                    <span className="text-danger">{errors.first_name.message}</span>}
                </div>
              </div>
              {/* Last Name Field */}
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="text-dark" htmlFor="last_name">Last Name</label>
                  <input 
                    className="form-control" 
                    id="last_name" 
                    name="last_name"
                    type="text" 
                    placeholder={"Last Name"}
                    ref={register({ 
                      required: {
                        value: true,
                        message: "Enter your last name"
                      }})}/>
                    {errors.last_name && errors.last_name.message &&
                    <span className="text-danger">{errors.last_name.message}</span>}
                </div>
              </div>
              {/* Location Field */}
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="text-dark" htmlFor="location">Location</label>
                  <input 
                    className="form-control" 
                    id="location" 
                    name="location"
                    type="text" 
                    placeholder={"Location"}
                    ref={register({ 
                      required: {
                        value: true,
                        message: "Enter your location"
                      }})}/>
                    {errors.location && errors.location.message &&
                    <span className="text-danger">{errors.location.message}</span>}
                </div>
              </div>
              {/* Bio Field */}
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="text-dark" htmlFor="location">Bio</label>
                  <input 
                    className="form-control" 
                    id="bio" 
                    name="bio"
                    type="text" 
                    placeholder={"Bio"}
                    ref={register({ 
                      required: {
                        value: true,
                        message: "Enter your biography"
                      }})}/>
                    {errors.bio && errors.bio.message &&
                    <span className="text-danger">{errors.bio.message}</span>}
                </div>
              </div>
              {/* Submit button section */}
              <div className="col-lg-12 text-center mt-5">
                <button 
                  type="submit" 
                  className="btn btn-block btn-dark"
                  disabled={submitted}>
                    {(submitted && 'Saved') || 'Save'}
              </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>      
  )
}

export default SettingsComponent;
  