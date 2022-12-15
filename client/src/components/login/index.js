import React, { useState } from "react";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import "./login.css"

const Login = () => {
  const location = useNavigate();
  const [state, setState] = useState({
    regNo: "",
    birthDate: "",
  });
  const handleChange = (field, value) => {
    setState({ ...state, [field]: value.target.value });
  };   
  const handleDatepickerChange = (e, fieldName) => {
    const date = moment(e.target.value).format("DD-MM-YYYY");
    console.log(date);
    setState({ ...state, [fieldName]: date });
  };                                                       
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        regNo: state.regNo,
        birthDate: state.birthDate,
      });
      console.log(res.data.data); 
      if (res.data) {
        if (res) {
          // localStorage.clear();
          alert("login Successfully");
          localStorage.setItem("token", JSON.stringify(res.data.token));
          // window.localStorage("token", res.data.data)
          location("/userDetails");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const data = () => {
    console.log("")
  }

  return (
    <div className="login_container">
        <div className="head_line mb-4 d-flex justify-content-center align-items-center">
          <span>Login Page</span>
        </div>
        <div className="panel-login-container">
          <div className="login_panel p-5">
          <form onSubmit={handleSubmit} className="login-form">
            <div className="row">
              <div className="form-group col-md-12 col-xs-12 col-sm-12 col-lg-12">
                <label htmlFor="mNo">Registration Number</label>
                <span style={{ color: "Red" }}>*</span>
                <input
                  type="number"s
                  name="regNo"
                  className="form-control"
                  id="mNo"
                  placeholder="Registration No."
                  onChange={(value) => handleChange("regNo", value)}
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-12 col-xs-12 col-sm-12 col-lg-12">
                <label htmlFor="birth">Birthdate</label>
                <span style={{ color: "Red" }}>*</span>
                <input
                  type="date"
                  name="birthDate"
                  className="form-control"
                  id="birth"
                  onChange={(e) => handleDatepickerChange(e, "birthDate")}
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-12 col-xs-12 col-sm-12 col-lg-12">
                <button type="submit" className="btn p-0 btn-success mt-3">
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
        </div>
      </div>
  );
};

export default React.memo(Login);
