import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./register.css";
import moment from "moment";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const form = useRef();

  const location = useNavigate();

  const initialState = {
    regNo: "",
    title: "",
    fname: "",
    mname: "",
    lname: "",
    motherName: "",
    birthDate: "",
    gender: "",
    maritalStatus: "",
    category: "",
    mobileNo: "",
    email: "",
    address1: "",
    state1: "",
    distict1: "",
    taluka1: "",
    city1: "",
    PINno1: "",
    address2: "",
    state2: "",
    distict2: "",
    taluka2: "",
    city2: "",
    PINno2: "",
    nationality: "",
    physChallange: "",
    widowCNo: "",
    widowCDate: "",
    cirtAutho: "",
    elanguage: [],
    hlanguage: [],
    glanguage: [],
  };

  const [state, setState] = useState(initialState);
  const [widow, setWidow] = useState(false);
  const [ph, setPh] = useState(false);
  const [states, setStates] = useState([]);
  const [stateid1, setStateid1] = useState("");
  const [stateid2, setStateid2] = useState("");
  const [city, setCity] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [elang, setELang] = useState([]);
  const [hlang, setHLang] = useState([]);
  const [glang, setGLang] = useState([]);
  const [upict, setUpict] = useState({});
  const [final, setFinal] = useState(false);

  useEffect(() => {
    const getState = async () => {
      const res = await axios.get("http://localhost:5050/states");
      setStates(res.data);
    };
    getState();
    generateRegNo();
  }, []);

  useEffect(() => {
    const getcity = async () => {
      const rescity = await axios.get(`http://localhost:5050/cities`);
      setCity(rescity.data);
    };
    getcity();
  }, []);

  // console.log((Math.floor(Math.random() * 10000000)) + 90000000)

  const st = [...new Set(states.filter((e) => e.country_id === "101"))];
  const ct1 = [...new Set(city.filter((e) => e.state_id === stateid1))];
  const ct2 = [...new Set(city.filter((e) => e.state_id === stateid2))];

  const handleHideShowWidow = (e) => {
    if (e.target.value === "no") {
      setWidow(false);
    } else if (e.target.value === "yes") {
      setWidow(true);
    } else {
      setWidow(false);
    }
  };

  console.log(state.elanguage, state.hlanguage, state.glanguage);

  const handlePh = () => {
    setPh(!ph);
  };

  const handleChange = (field, value) => {
    setState({ ...state, [field]: value.target.value });
  };

  const handleDatepickerChange = (e, fieldName) => {
    const date = moment(e.target.value).format("DD-MM-YYYY");
    setState({ ...state, [fieldName]: date });
  };

  const handlestate1 = (event) => {
    const getstateid = event.target.value;
    setStateid1(getstateid);
    setState({ ...state, state1: getstateid });
  };
  const handlestate2 = (event) => {
    const getstateid = event.target.value;
    setStateid2(getstateid);
    setState({ ...state, state2: getstateid });
  };

  const sameAddress = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      setState({
        ...state,
        address2: state.address1,
        state2: state.state1,
        distict2: state.distict1,
        taluka2: state.taluka1,
        city2: state.city1,
        PINno2: state.PINno1,
      });
    } else {
      setState({
        ...state,
        address2: "",
        state2: "",
        distict2: "",
        taluka2: "",
        city2: "",
        PINno2: "",
      });
    }
  };

  const getElang = (e) => {
    // let langData = lang
    // langData.push(e.target.value)
    // console.log(langData)
    // setLang(langData)
    const { value, checked } = e.target;
    if (checked) {
      setELang([...elang, value]);
    } else {
      setELang(elang.filter((e) => e !== value));
    }
    setState({ ...state, elanguage: elang });
  };

  const getHlang = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setHLang([...hlang, value]);
    } else {
      setHLang(hlang.filter((e) => e !== value));
    }
  };
  const getGlang = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setGLang([...glang, value]);
    } else {
      setGLang(glang.filter((e) => e !== value));
    }
  };
  const getFile = (e) => {
    let file = e.target.files[0];

    setUpict(file);

    // setState({...state, [name] : file})
  };
  // console.log(Math.floor(Math.random() * 30000000) + 39999999);

  const finalSelect = (e) => {
    console.log(e.target.checked)
    const { checked } = e.target;
    if (checked === true) {
      setFinal(true);
    } else {
      setFinal(false);
    }
  };

  const sendEmail = (e) => {
    // e.preventDefault();
    emailjs
      .sendForm(
        "service_f2tpb3f",
        "template_7lmhuhn",
        form.current,
        "PnrgU-2GtTdFjdDoG"
      )
      .then((result) => {
        console.log(result);
      });
    e.target.reset();
  };

  console.log(state.final)

  const generateRegNo = () => {
    const reg = (Math.floor(Math.random() * 30000000) + 39999999).toString();
    setState({ ...state, regNo: reg });
  };

  console.log(state.regNo);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!final) {
        alert("Please Select confirmation")
      } else {
        const res = await axios.post("http://localhost:5000/api/signup", {
          ...state,
          regNo: (Math.floor(Math.random() * 30000000) + 39999999).toString(),
        });
        if (res) {
          console.log(res);
          alert("Registration Successfully");
          location("/signin");
          sendEmail();
        }

        setWidow(false);
        setPh(false);
        setStates([]);
        setStateid1("");
        setStateid2("");
        setCity([]);
        setIsChecked(false);
        setELang([]);
        setHLang([]);
        setGLang([]);
        setState(initialState);
      }
    } catch (error) {
      alert("Please fill all require field")
      console.log(error);
    }
  };
  console.log(upict);

  return (
    <div>
      <section className="wrapper banner-wrapper">
        <div className="head_line mb-4 d-flex justify-content-center align-items-center">
          <span>Registration Page</span>
        </div>
      </section>
      <form ref={form} onSubmit={handleSubmit}>
        <div className="register_form container">
          <div>
            <div className="reg_panel ">
              <div className="panel_heading">
                <h5 className="panel_title">Personal Information</h5>
              </div>
            </div>
            <div className="panel_body ">
              <div className="row">
                <div className=" form-group col-md-12 col-lg-12 col-sm-12">
                  <div className="row">
                    <div className="col-md-3 col-xs-6 col-sm-6 col-lg-3">
                      <label htmlFor="title">Title</label>
                      <select
                        className="form-control"
                        id="title"
                        name="title"
                        value={state.title}
                        onChange={(value) => handleChange("title", value)}
                      >
                        <option value="">Select</option>
                        <option value="Mr.">Mr.</option>
                        <option value="Mrs.">Mrs.</option>
                        <option value="Ms.">Ms.</option>
                        <option value="Dr.">Dr.</option>
                      </select>
                    </div>
                    <div className="col-md-3 col-xs-6 col-sm-6 col-lg-3">
                      <label htmlFor="fName">First Name</label>
                      <span style={{ color: "Red" }}>*</span>
                      <input
                        type="text"
                        name="fname"
                        className="form-control"
                        id="fName"
                        value={state.fname}
                        placeholder="First Name"
                        onChange={(value) => handleChange("fname", value)}
                      />
                    </div>
                    <div className="col-md-3 col-xs-6 col-sm-6 col-lg-3">
                      <label htmlFor="MidName">Middle Name</label>
                      <span style={{ color: "Red" }}>*</span>
                      <input
                        type="text"
                        name="mname"
                        className="form-control"
                        id="MidName"
                        placeholder="First Name"
                        value={state.mname}
                        onChange={(value) => handleChange("mname", value)}
                      />
                    </div>
                    <div className="col-md-3 col-xs-6 col-sm-6 col-lg-3">
                      <label htmlFor="lName">Last Name</label>
                      <span style={{ color: "Red" }}>*</span>
                      <input
                        type="text"
                        name="lname"
                        className="form-control"
                        id="lName"
                        value={state.lname}
                        placeholder="Last Name"
                        onChange={(value) => handleChange("lname", value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className=" form-group col-md-12 col-lg-12 col-sm-12">
                  <div className="row">
                    <div className="col-md-3 col-xs-6 col-sm-6 col-lg-3">
                      <label htmlFor="MName">Mother Name</label>
                      <span style={{ color: "Red" }}>*</span>
                      <input
                        type="text"
                        name="motherName"
                        className="form-control"
                        id="MName"
                        value={state.motherName}
                        placeholder="Mother Name"
                        onChange={(value) => handleChange("motherName", value)}
                      />
                    </div>
                    <div className="col-md-2 col-xs-6 col-sm-6 col-lg-2">
                      <label htmlFor="birthd">Date of Birth</label>
                      <span style={{ color: "Red" }}>*</span>
                      <input
                        type="date"
                        name="birthDate"
                        className="form-control"
                        id="birthd"
                        // value={state.birthDate}
                        onChange={(e) => handleDatepickerChange(e, "birthDate")}
                      />
                    </div>
                    <div className="col-md-2 col-xs-6 col-sm-6 col-lg-2">
                      <label htmlFor="gender">Gender</label>
                      <span style={{ color: "Red" }}>*</span>
                      <select
                        className="form-control"
                        id="gender"
                        name="gender"
                        value={state.gender}
                        onChange={(value) => handleChange("gender", value)}
                      >
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="col-md-3 col-xs-6 col-sm-6 col-lg-3">
                      <label htmlFor="mStatus">Marital Status</label>{" "}
                      <span style={{ color: "Red" }}>*</span>
                      <select
                        className="form-control"
                        id="mStatus"
                        name="maritalStatus"
                        value={state.maritalStatus}
                        onChange={(value) =>
                          handleChange("maritalStatus", value)
                        }
                      >
                        <option value="">Select</option>
                        <option value="Married">Married</option>
                        <option value="Unmarried">Unmarried</option>
                        <option value="Seperated">Seperated</option>
                      </select>
                    </div>
                    <div className="col-md-2 col-xs-6 col-sm-6 col-lg-2">
                      <label htmlFor="category">Category</label>{" "}
                      <span style={{ color: "Red" }}>*</span>
                      <select
                        className="form-control"
                        id="category"
                        name="category"
                        value={state.category}
                        onChange={(value) => handleChange("category", value)}
                      >
                        <option value="">Select</option>
                        <option value="General">General</option>
                        <option value="General(EWS)">General(EWS)</option>
                        <option value="SEBC">SEBC</option>
                        <option value="SC">SC</option>
                        <option value="ST">ST</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="reg_panel ">
              <div className="panel_heading">
                <h5 className="panel_title">Communication Details</h5>
              </div>
            </div>
            <div className="panel_body ">
              <div className="row">
                <div className=" form-group col-md-12 col-lg-12 col-sm-12">
                  <div className="row">
                    <div className="col-md-3 col-xs-6 col-sm-6 col-lg-3">
                      <label htmlFor="mNo">Mobile Number</label>
                      <span style={{ color: "Red" }}>*</span>
                      <input
                        type="number"
                        name="mobileNo"
                        className="form-control"
                        id="mNo"
                        placeholder="mobile No."
                        value={state.mobileNo}
                        onChange={(value) => handleChange("mobileNo", value)}
                      />
                    </div>
                    <div className="col-md-3 col-xs-6 col-sm-6 col-lg-3">
                      <label htmlFor="email">Email</label>
                      <span style={{ color: "Red" }}>*</span>
                      <input
                        type="text"
                        name="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter email"
                        value={state.email}
                        onChange={(value) => handleChange("email", value)}
                      />
                    </div>
                    <div className="col-md-3 col-xs-6 col-sm-6 col-lg-3">
                      <label htmlFor="email"></label>
                      <span style={{ color: "Red" }}>*</span>
                      <input
                        type="number"
                        name="regNo"
                        className="form-control"
                        disabled
                        value={state.regNo}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="reg_panel ">
              <div className="panel_heading">
                <h5 className="panel_title">Residential Details</h5>
              </div>
            </div>
            <div className="panel_body ">
              <div className="row">
                <div className="form-group col-md-6 col-xs-6 col-sm-6 col-lg-6">
                  <div className="row">
                    <div className="col-md-12 col-xs-12 col-sm-12 col-lg-12">
                      <div className="row">
                        <div className="col">
                          <h5>Present Address</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 col-xs-12 col-sm-12 col-lg-12">
                      <div className="row">
                        <div className="col">
                          <label htmlFor="paddress">Address</label>
                          <span style={{ color: "Red" }}>*</span>
                          <textarea
                            type="text"
                            name="address1"
                            className="form-control"
                            id="paddress"
                            placeholder="Enter Address"
                            value={state.address1}
                            onChange={(value) =>
                              handleChange("address1", value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 col-xs-12 col-sm-12 col-lg-12">
                      <div className="row">
                        <div className="col">
                          <label htmlFor="state1">State</label>
                          <span style={{ color: "Red" }}>*</span>
                          <select
                            className="form-control"
                            id="state1"
                            name="state1"
                            value={state.state1}
                            onChange={(value) => handlestate1(value)}
                          >
                            <option value="">--Select State--</option>
                            {st.map((getst, index) => (
                              <option key={index} value={getst.state_id}>
                                {getst.state_name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 col-xs-12 col-sm-12 col-lg-12">
                      <div className="row">
                        <div className="col">
                          <label htmlFor="distict1">Distict</label>
                          <span style={{ color: "Red" }}>*</span>
                          <input
                            type="text"
                            name="distict1"
                            className="form-control"
                            id="distict1"
                            value={state.distict1}
                            placeholder="Distict"
                            onChange={(value) =>
                              handleChange("distict1", value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 col-xs-12 col-sm-12 col-lg-12">
                      <div className="row">
                        <div className="col">
                          <label htmlFor="taluka1">Taluka</label>
                          <span style={{ color: "Red" }}>*</span>
                          <input
                            type="text"
                            name="taluka1"
                            className="form-control"
                            id="taluka1"
                            placeholder="taluka"
                            value={state.taluka1}
                            onChange={(value) => handleChange("taluka1", value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 col-xs-12 col-sm-12 col-lg-12">
                      <div className="row">
                        <div className="col">
                          <label htmlFor="city1">City</label>
                          <span style={{ color: "Red" }}>*</span>
                          <select
                            className="form-control"
                            id="city1"
                            name="city1"
                            value={state.city1}
                            onChange={(value) => handleChange("city1", value)}
                          >
                            <option value="">--Select City--</option>
                            {ct1.map((getct, index) => (
                              <option key={index} value={getct.city_name}>
                                {getct.city_name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 col-xs-12 col-sm-12 col-lg-12">
                      <div className="row">
                        <div className="col">
                          <label htmlFor="pin1">PIN Code</label>
                          <span style={{ color: "Red" }}>*</span>
                          <input
                            type="number"
                            name="PINno1"
                            className="form-control"
                            id="pin1"
                            value={state.PINno1}
                            onChange={(value) => handleChange("PINno1", value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 col-xs-12 col-sm-12 col-lg-12">
                      <div className="row">
                        <div className="col">
                          <label htmlFor="N">Nationality</label>
                          <span style={{ color: "Red" }}>*</span>
                          <input
                            type="text"
                            name="nationality"
                            className="form-control"
                            id="N"
                            placeholder="Nationality"
                            value={state.nationality}
                            onChange={(value) =>
                              handleChange("nationality", value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" form-group col-md-6 col-xs-6 col-lg-6 col-sm-6">
                  <div className="row">
                    <div className="col-md-12 col-xs-12 col-sm-12 col-lg-12">
                      <div className="row">
                        <div className="col">
                          <h5>Permenent Address</h5>
                          <span>
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={sameAddress}
                              value={isChecked}
                            />
                            Same As Present Address
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 col-xs-12 col-sm-12 col-lg-12">
                      <div className="row">
                        <div className="col">
                          <label htmlFor="paddress">Address</label>
                          <span style={{ color: "Red" }}>*</span>
                          <textarea
                            type="text"
                            name="address2"
                            value={state.address2}
                            className="form-control"
                            id="paddress"
                            placeholder="Enter Address"
                            onChange={(value) =>
                              handleChange("address2", value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 col-xs-12 col-sm-12 col-lg-12">
                      <div className="row">
                        <div className="col">
                          <label htmlFor="state2">State</label>
                          <span style={{ color: "Red" }}>*</span>
                          <select
                            className="form-control"
                            id="state2"
                            name="state2"
                            value={state.state2}
                            onChange={(value) => handlestate2(value)}
                          >
                            <option value="">--Select State--</option>
                            {st.map((getst, index) => (
                              <option key={index} value={getst.state_id}>
                                {getst.state_name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 col-xs-12 col-sm-12 col-lg-12">
                      <div className="row">
                        <div className="col">
                          <label htmlFor="distict2">Distict</label>
                          <span style={{ color: "Red" }}>*</span>
                          <input
                            type="text"
                            name="distict2"
                            value={state.distict2}
                            className="form-control"
                            id="distict2"
                            placeholder="Distict"
                            onChange={(value) =>
                              handleChange("distict2", value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 col-xs-12 col-sm-12 col-lg-12">
                      <div className="row">
                        <div className="col">
                          <label htmlFor="taluka2">Taluka</label>
                          <span style={{ color: "Red" }}>*</span>
                          <input
                            type="text"
                            name="taluka2"
                            value={state.taluka2}
                            className="form-control"
                            id="taluka2"
                            placeholder="taluka"
                            onChange={(value) => handleChange("taluka2", value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 col-xs-12 col-sm-12 col-lg-12">
                      <div className="row">
                        <div className="col">
                          <label htmlFor="city2">City</label>
                          <span style={{ color: "Red" }}>*</span>
                          <select
                            className="form-control"
                            id="city2"
                            name="city2"
                            value={state.city2}
                            onChange={(value) => handleChange("city2", value)}
                          >
                            <option value="">--Select City--</option>
                            {ct2.map((getct, index) => (
                              <option key={index} value={getct.city_id}>
                                {getct.city_name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 col-xs-12 col-sm-12 col-lg-12">
                      <div className="row">
                        <div className="col">
                          <label htmlFor="pin2">PIN Code</label>
                          <span style={{ color: "Red" }}>*</span>
                          <input
                            type="number"
                            name="PINno2"
                            value={state.PINno2}
                            className="form-control"
                            id="pin2"
                            onChange={(value) => handleChange("PINno2", value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div>
        <div className="reg_panel ">
          <div className="panel_heading">
            <h5 className="panel_title">Education Details</h5>
          </div>
        </div>
        <div className="panel_body ">
          <div className="row">
            <div className=" form-group col-md-12 col-lg-12 col-sm-12">
              <div className="row">
                <div className="col-md-4 col-xs-6 col-sm-6 col-lg-4">
                <label htmlFor="HQ">Highest Qualification</label>{" "}
                  <span style={{ color: "Red" }}>*</span>
                  <select className="form-control" id="HQ" >
                    <option value="">Select</option>
                    <option value="Ph.D.">Ph.D.</option>
                    <option value="post graduation">Post Graduation</option>
                    <option value="Graduation">Graduation</option>
                    <option value="HSC">HSC</option>
                    <option value="SSC">SSC</option>
                  </select>
                </div>
                <div className="col-md-4 col-xs-6 col-sm-6 col-lg-4">
                  <label htmlFor="field">Field</label>
                  <span style={{ color: "Red" }}>*</span>
                  <input
                    type="text"
                    className="form-control"
                    id="field"
                    placeholder="field"
                    
                  />
                </div>
                <div className="col-md-4 col-xs-6 col-sm-6 col-lg-4">
                  <label htmlFor="EXP">Experience</label>
                  <span style={{ color: "Red" }}>*</span>
                  <input
                    type="text"
                    className="form-control"
                    id="EXP"
                    placeholder="experience"
                    
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
          <div>
            <div className="reg_panel ">
              <div className="panel_heading">
                <h5 className="panel_title">Other Details</h5>
              </div>
            </div>
            <div className="panel_body ">
              <div className="row">
                <div className=" form-group col-md-12 col-lg-12 col-sm-12">
                  <div className="row">
                    <div className="col-md-4 col-xs-6 col-sm-6 col-lg-4">
                      <h5>Physically Challanged</h5>
                      <p>(As Per Published Advertisement Percentage)</p>
                    </div>
                    <div className="col-md-4 col-xs-6 col-sm-6 col-lg-4">
                      <input type="checkbox" value={ph} onChange={handlePh} />
                      <span style={{ marginLeft: "10px" }}>
                        If PH Please Select
                      </span>
                    </div>
                    <div className="col-md-4 col-xs-6 col-sm-6 col-lg-4">
                      <select
                        className="form-control"
                        id="category"
                        disabled={ph ? false : true}
                        name="physChallange"
                        value={state.physChallange}
                        onChange={(value) =>
                          handleChange("physChallange", value)
                        }
                      >
                        <option value="">Select</option>
                        <option value="Blindness">Blindness</option>
                        <option value="Deaf & Dumb">Deaf & Dumb</option>
                        <option value="Low Vision">Low Vision</option>
                        <option value="Hearing Handicap">
                          Hearing Handicap
                        </option>
                        <option value="Orthopedics (OA, OL, BL, OAL)">
                          Orthopedics (OA, OL, BL, OAL)
                        </option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 col-xs-12 col-sm-12 col-lg-12">
                      <hr style={{ color: "#00468b" }} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-2 col-xs-6 col-sm-6 col-lg-2">
                      <h5>Widow</h5>
                      <div className="check_box">
                        <input
                          type="radio"
                          name="gen"
                          value="yes"
                          defaultChecked
                          onClick={handleHideShowWidow}
                        />
                        Yes
                        <input
                          type="radio"
                          name="gen"
                          value="no"
                          className="ml-2"
                          defaultChecked={widow === false ? true : false}
                          onClick={handleHideShowWidow}
                        />
                        No
                      </div>
                    </div>
                    <div className="col-md-4 col-xs-6 col-sm-6 col-lg-4">
                      <label htmlFor="wid">Widow Certificate No.</label>
                      <span style={{ color: "Red" }}>*</span>
                      <input
                        type="number"
                        name="widowCNo"
                        className="form-control"
                        id="wid"
                        disabled={widow ? false : true}
                        onChange={(value) => handleChange("widowCNo", value)}
                      />
                    </div>
                    <div className="col-md-3 col-xs-6 col-sm-6 col-lg-3">
                      <label htmlFor="widc">Widow Certificate Date.</label>
                      <span style={{ color: "Red" }}>*</span>
                      <input
                        type="date"
                        name="widowCDate"
                        className="form-control"
                        id="widc"
                        disabled={widow ? false : true}
                        onChange={(value) => handleChange("widowCDate", value)}
                      />
                    </div>
                    <div className="col-md-3 col-xs-6 col-sm-6 col-lg-3">
                      <label htmlFor="widc">Certifying Authority</label>
                      <span style={{ color: "Red" }}>*</span>
                      <select
                        className="form-control"
                        name="cirtAutho"
                        id="state1"
                        disabled={widow ? false : true}
                        onChange={(value) => handleChange("cirtAutho", value)}
                      >
                        <option value="">Select</option>
                        <option value="Mamalatdar">Mamalatdar</option>
                        <option value="">
                          T.D.O.(Taluka Development Officer)
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="reg_panel ">
              <div className="panel_heading">
                <h5 className="panel_title">Other Details</h5>
              </div>
            </div>
            <div className="panel_body ">
              <table className="table table-responsive">
                <thead>
                  <tr>
                    <td className="col-md-3 col-lg-3 col-sm-3 hidden-xs">
                      <span id="lblLangProf"> Language Proficiency</span>
                    </td>
                    <td className="col-md-3 col-lg-3 col-sm-3">
                      <span id="lblLang">Language</span>
                    </td>
                    <td className="col-md-2 col-lg-2 col-sm-2">
                      <span id="lblRead">Read</span>
                    </td>
                    <td className="col-md-2 col-lg-2 col-sm-2">
                      <span id="lblWrite">Write</span>
                    </td>
                    <td className="col-md-2 col-lg-2 col-sm-2">
                      <span id="lblSpeak">Speak</span>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="col-md-3 col-lg-3 col-sm-3 hidden-xs" />
                    <td className="col-md-3 col-lg-3 col-sm-3">
                      <input
                        name="txtLang_eng"
                        type="text"
                        defaultValue="English"
                        readOnly="readonly"
                        id="txtLang_eng"
                        className="form-control"
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td className="col-md-2 col-lg-2 col-sm-2">
                      <input
                        id="cbLang_eng_read"
                        type="checkbox"
                        name="cbLang_eng_read"
                        value="eng_read"
                        onChange={(e) => getElang(e)}
                      />
                    </td>
                    <td className="col-md-2 col-lg-2 col-sm-2">
                      <input
                        id="cbLang_eng_Write"
                        type="checkbox"
                        name="cbLang_eng_Write"
                        value="eng_write"
                        onChange={(e) => getElang(e)}
                      />
                    </td>
                    <td className="col-md-2 col-lg-2 col-sm-2">
                      <input
                        id="cbLang_eng_Speak"
                        type="checkbox"
                        name="cbLang_eng_Speak"
                        value="eng_speak"
                        onChange={(e) => getElang(e)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="col-md-3 col-lg-3 col-sm-3 hidden-xs" />
                    <td className="col-md-3 col-lg-3 col-sm-3">
                      <input
                        name="txtLang_hin"
                        type="text"
                        defaultValue="Hindi"
                        readOnly="readonly"
                        id="txtLang_hin"
                        className="form-control"
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td className="col-md-2 col-lg-2 col-sm-2">
                      <input
                        id="cbLang_hin_read"
                        type="checkbox"
                        name="cbLang_hin_read"
                        value="hind_read"
                        onChange={(e) => getHlang(e)}
                      />
                    </td>
                    <td className="col-md-2 col-lg-2 col-sm-2">
                      <input
                        id="cbLang_hin_Write"
                        type="checkbox"
                        name="cbLang_hin_Write"
                        value="hind_write"
                        onChange={(e) => getHlang(e)}
                      />
                    </td>
                    <td className="col-md-2 col-lg-2 col-sm-2">
                      <input
                        id="cbLang_hin_Speak"
                        type="checkbox"
                        name="cbLang_hin_Speak"
                        value="hind_speak"
                        onChange={(e) => getHlang(e)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="col-md-3 col-lg-3 col-sm-3 hidden-xs" />
                    <td className="col-md-3 col-lg-3 col-sm-3">
                      <input
                        name="txtLang_guj"
                        type="text"
                        defaultValue="Gujarati"
                        readOnly="readonly"
                        id="txtLang_guj"
                        className="form-control"
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td className="col-md-2 col-lg-2 col-sm-2">
                      <input
                        id="cbLang_guj_read"
                        type="checkbox"
                        name="cbLang_guj_read"
                        value="guj_read"
                        onChange={(e) => getGlang(e)}
                      />
                    </td>
                    <td className="col-md-2 col-lg-2 col-sm-2">
                      <input
                        id="cbLang_guj_Write"
                        type="checkbox"
                        name="cbLang_guj_Write"
                        value="guj_write"
                        onChange={(e) => getGlang(e)}
                      />
                    </td>
                    <td className="col-md-2 col-lg-2 col-sm-2">
                      <input
                        id="cbLang_guj_Speak"
                        type="checkbox"
                        name="cbLang_guj_Speak"
                        value="guj_speak"
                        onChange={(e) => getGlang(e)}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <div className="reg_panel">
              <div className="panel_heading">
                <h5 className="panel_title">
                  Upload Photograph/ફોટો અપલોડ કરો
                </h5>
              </div>
            </div>
            <div className="panel_body ">
              <h5>
                Note : Quality of Photograph should be Good Enough to Be
                Identifiable and Acceptable.
              </h5>
              <p>
                નોંધ : અપલોડ કરેલ ફોટોગ્રાફ ની ગુણવત્તા ઓળખી શકાય તેવી અને
                સ્વીકાર્ય હોવી જરુરી છે. ફોટો JPG ફોર્મેટમાં અપલોડ કરવો.
              </p>
              <input type="file" name="uPhoto" onChange={(e) => getFile(e)} />
              <p>ફોટાનું માપ: 5 સે.મી. લંબાઇ 3.6 સે.મી. પહોળાઇાઇ</p>
              <p> Photo ની Size 15 KB થી વધારે રાખવી નહિ.</p>
            </div>
          </div>
          <div>
            <div className="reg_panel ">
              <div className="panel_heading">
                <h5 className="panel_title">Declaration</h5>
              </div>
            </div>
            <div className="panel_body ">
              <h4>
                આથી હું ખાતરીપૂર્વક જાણુ છુ કે ઉપર જણાવેલ વિગતો મારી જાણ મુજબ
                સાચી છે
              </h4>
              <p>
                નોંધ : સફેદ કગળ ઉપર કાળા/બ્લ્યુ કલરમાં સહી કરીને તેને સ્કેન
                કરીને JPG ફોર્મેટમાં અપલોડ કરો.
              </p>
              <input
                type="file"
                name="signature"
                onChange={(e) => getFile(e)}
              />
              <p>સહીનું માપ: 2.5 સે.મી. લંબાઇ 7.5 સે.મી. પહોળાઇ</p>
              <p> Signature ની Size 15 KB થી વધારે રાખવી નહિ.</p>
            </div>
          </div>
          <div>
            <div className="reg_panel ">
              <div className="panel_heading">
                <h5 className="panel_title">Upload Signature/સહી અપલોડ કરો</h5>
              </div>
            </div>
            <div className="panel_body ">
              <h4>
                આથી હું ખાતરીપૂર્વક જાણુ છુ કે ઉપર જણાવેલ વિગતો મારી જાણ મુજબ
                સાચી છે
              </h4>
              <p>
                નોંધ: ONE TIME REGISTRATION એ માત્ર ઉમેદવારોને અરજી કરવા માટેની
                વધારાની સગવડ છે.
              </p>
              <p>
                ONE TIME REGISTRATION નો હેતું ઉમેદવારોને OJAS મા Online આવતી
                જાહેરાતમાં પોતાની વિગતો વારંવાર ભરવી ન પડે અને અરજી ઝડપથી થાય
                માત્ર તે માટે છે. આનો અર્થ એ નથી કે REGISTRATION કરવાથી જાહેરાત
                (જે તે જાહેરાત/કોઈપણ જાહેરાત) માટે અરજી થયેલ છે.
              </p>
              <input type="checkbox" name="final" onChange={finalSelect} /> Yes
              {/* <input type="radio" name="final" style={{ marginLeft: "10px" }} /> No */}
            </div>
          </div>
        </div>
        <div className="register_button">
          <input type="submit" value="Register"/>
        </div>
      </form>
    </div>
  );
};

export default Register;
