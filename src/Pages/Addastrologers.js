import { Link } from "react-router-dom";
import "../Stylesheets/Addastrologer.scss";
import { Box } from "@mui/material";
import React from 'react'
import { FloatingLabel, Form, Dropdown,ButtonGroup,Button, Spinner } from "react-bootstrap";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { v4 as uuid } from "uuid";
import { useSelector } from "react-redux";
import MetaData from "../Components/MetaData";
function Addastrologers() {
  const [dob, setDob] = useState(null);
  const [doberr, setDoberr] = useState(false);
  const [certificates, setCertificates] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [profilePhoto, setProfilePhoto] = useState([]);
  const [photoErr, setPhotoErr] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [categories, setCategories] = useState(null);
  const[languages,setLanguages] = useState(null)
  

 
  useEffect(() => {
    async function fetchData() {
        let response = await fetch(`${process.env.REACT_APP_URL}/api/v1/method/show`, {
            headers: {
                'Content-type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            },   
        method: "GET",
        });
        // console.log(response);
        let data = await response.json();
        console.log(data)
        setIsloading(false)
        setCategories(data.categories)
        console.log(categories);
    }
    fetchData();
}, []);
useEffect(() => {
  async function fetchData() {
      let response = await fetch(`${process.env.REACT_APP_URL}/api/v1/language/show`, {
          headers: {
              'Content-type': 'multipart/form-data',
              Authorization: `Bearer ${token}`
          },   
      method: "GET",
      });
      // console.log(response);
      let data = await response.json();
      console.log(data)
      setIsloading(false)
      setLanguages(data.languages)
      console.log(languages);
  }
  fetchData();
}, []);
  const { token } = useSelector((state) => state.authState);

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];

    // // Check if a file is selected
    // if (!selectedFile) {
    //     setErrorMessage('Please select a file.');
    //     return;
    // }

    // Check file type (pdf or jpeg)
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/jpg",
      "image/png",
    ];
    if (!allowedTypes.includes(selectedFile.type)) {
      setErrorMessage(
        "File type not allowed. Please select a PDF or JPEG or PNG file."
      );
      return;
    }
    // Check file size (in bytes)
    const maxSizeInBytes = 2 * 1024 * 1024; // 2 MB
    if (selectedFile.size > maxSizeInBytes) {
      setErrorMessage("File size exceeds the maximum allowed size (2MB).");
      return;
    }

    // Check the number of files
    if (certificates.length >= 4) {
      setErrorMessage("You can only upload up to 4 files.");
      return;
    }

    // All checks passed, add the file to the state
    setCertificates([...certificates, selectedFile]);
    setErrorMessage("");
  };

  const handlePhoto = (e) => {
    const selectedPhoto = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(selectedPhoto.type)) {
      setPhotoErr(
        "File type not allowed. Please select a PDF or JPEG or PNG file."
      );
      return;
    }
    // Check file size (in bytes)
    const maxSizeInBytes = 2 * 1024 * 1024; // 2 MB
    if (selectedPhoto.size > maxSizeInBytes) {
      setPhotoErr("File size exceeds the maximum allowed size (2MB).");
      return;
    }

    // Check the number of files
    if (profilePhoto?.length >= 1) {
      setPhotoErr("You can only upload up to 1 files.");
      return;
    }

    // All checks passed, add the file to the state
    setProfilePhoto(selectedPhoto);
    setPhotoErr("");
  };
  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  // useEffect(() => {
  //   reset();
  // }, [isSubmitSuccessful, reset]);

  const validation = {
    firstname: {
      required: {
        value: true,
        message: "Enter firstname",
      },
    },
    category: {
      required: {
        value: true,
        message: "select Category",
      },
    },
   language: {
      required: {
        value: true,
        message: "select Language",
      },
    },
    lastname: {
      required: {
        value: true,
        message: "Enter lastname",
      },
    },
    gender: {
      required: {
        value: true,
        message: "Select Gender",
      },
    },

    email: {
      required: {
        value: true,
        message: "Enter Email",
      },
      pattern: {
        value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
        message: "Enter valid Email address",
      },
    },
    mobilePrimary: {
      required: {
        value: true,
        message: "Enter primary Mobile number",
      },
      pattern: {
        value: /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
        message: "Enter valid phone number",
      },
    },
    mobileSecondary: {
      pattern: {
        value: /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
        message: "Enter valid phone number",
      },
    },
    astrologyDescription: {
      validate: (value) => {
        if (value.split(" ").length > 50) {
          return "Describe in 50 Words";
        }
      },
    },
    astrologyExperience: {
      validate: (value) => {
        if (value.split(" ").length > 50) {
          return "Describe in 50 Words";
        }
      },
    },
    astrologyExpertise: {
      validate: (value) => {
        if (value.split(" ").length > 50) {
          return "Describe in 50 Words";
        }
      },
    },
    knowus: {
      validate: (value) => {
        if (value.split(" ").length > 50) {
          return "Describe in 50 Words";
        }
      },
    },
  };

  const onSubmit = async (data) => {

    setIsloading(true);
    if (dob) {
  
      const astrologerDetails = new FormData();

      Object.keys(data).forEach((key) => {
        astrologerDetails.set(key, data[key]);
      });
      astrologerDetails.set("dob", dob);
      astrologerDetails.set('profilePic', profilePhoto)

      Object.keys(certificates).forEach((key, index) => {
          astrologerDetails.set(`certificates`, certificates[key]);
      });

      const astroID = uuid().slice(0, 6).toUpperCase();
      astrologerDetails.set("astrologerID", astroID);
      if(!data){
        console.error('no data');
        return
      }else{
        console.log('lf',astrologerDetails);

      }
      const response = await fetch(
        `${process.env.REACT_APP_URL}/api/v1/astrologer/register`,
        {
          headers: {
            
            Authorization: `Bearer ${token}`,
          },
          method: "POST",
          body: astrologerDetails,
        }
      );
       const jsonResponse = await response.json();
       console.log('res',jsonResponse);
      if (response.ok === false) {
        alert("Registration Failed");
      } else {
      
        alert("Registration Successful");
      }
      setIsloading(false);
      setDob(null);
      setCertificates([]);
      setProfilePhoto(null);
    } else {
      setDoberr(true);
      setIsloading(false);
    }
  };
 return (
    <div className="infoContainer">
        <MetaData title={'Astro5Star-Manager'} />

      <main id="admin-addastro">
        <section className="astro-head">
          <div>
            <h3>Astrologer Registration</h3>
            <div
              style={{
                height: "3px",
                width: "40px",
                backgroundColor: "#0042ae",
                borderRadius: "10px",
                marginTop: "3px",
              }}
            ></div>
          </div>
        </section>
        <section className="my-4">
          <Form
            className="reg-form"
            onSubmit={handleSubmit(onSubmit)}
            encType="multipart/form-data"
          >
            <article className="basicDetails">
              <p style={{ fontSize: "16px", textDecoration: "underline" }}>
                Basic details
              </p>

              <div className="threeCol">
                {/* FirstName */}

                <div className="mb-3">
                  <FloatingLabel controlId="firstname" label="First Name">
                    <Form.Control
                      type="text"
                      placeholder="firstname"
                      name="firstname"
                      {...register("firstname", validation.firstname)}
                    />
                  </FloatingLabel>
                  <p className="errormsg">
                    {errors.firstname && errors.firstname.message}
                  </p>
                </div>

                {/* lastName */}
                <div className="mb-3">
                  <FloatingLabel controlId="lastname" label="Last Name">
                    <Form.Control
                      type="text"
                      placeholder="lastname"
                      name="lastname"
                      {...register("lastname", validation.lastname)}
                    />
                  </FloatingLabel>
                  <p className="errormsg">
                    {errors.lastname && errors.lastname.message}
                  </p>
                </div>
                <div className="mx-2">
                  <Form.Label className="me-3" style={{ display: "block" }}>
                    IsActive
                  </Form.Label>
                  <Form.Check
                    type="radio"
                    label="Yes"
                    name="isActive"
                    inline
                    id="inline-radio-1"
                    value="true"
                    defaultChecked
                    {...register("isActive")}
                  />
                  <Form.Check
                    type="radio"
                    label="No"
                    name="isActive"
                    inline
                    id="inline-radio-2"
                    value="false"
                    {...register("isActive")}
                  />
                </div>
              </div>
              <div className="threeCol">
                {/* Dob */}
                <div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        label="Date of Birth"
                        className="mb-3"
                        value={dob}
                        onChange={(newValue) => setDob(newValue)}
                        format="DD-MM-YYYY"
                        maxDate={dayjs()}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                  {doberr && <p className="errormsg">Enter DOB</p>}
                </div>
                {/* Gender */}
                <div className="mb-3">
                  <div className="mx-2">
                    <Form.Label className="me-3" style={{ display: "block" }}>
                      Select Gender
                    </Form.Label>
                    <Form.Check
                      type="radio"
                      label="Male"
                      name="gender"
                      inline
                      id="inline-radio-1"
                      value="male"
                      {...register("gender", validation.gender)}
                    />
                    <Form.Check
                      type="radio"
                      label="Female"
                      name="gender"
                      inline
                      id="inline-radio-2"
                      value="female"
                      {...register("gender", validation.gender)}
                    />
                    <Form.Check
                      type="radio"
                      label="Others"
                      name="gender"
                      inline
                      id="inline-radio-3"
                      value="others"
                      {...register("gender", validation.gender)}
                    />
                  </div>
                  <p className="errormsg">
                    {errors.gender && errors.gender.message}
                  </p>
                </div>

                <div className="mb-3">
                  <FloatingLabel controlId="photo" label="Profile Photo">
                    <Form.Control
                      type="file"
                      placeholder="Profile Photo"
                      name="Profile Photo"
                      onChange={handlePhoto}
                      accept="image/png, image/jpeg"
                    />
                  </FloatingLabel>

                  {photoErr && <p style={{ color: "red" }}>{photoErr}</p>}
                  <p>Photo: {profilePhoto?.name}</p>
                </div>
              </div>
              <div className="threeCol">
                {/* Email */}
                <div className="mb-3">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Email address"
                  >
                    <Form.Control
                      type="email"
                      placeholder="name@example.com"
                      name="email"
                      {...register("email", validation.email)}
                    />
                  </FloatingLabel>
                  <p className="errormsg">
                    {errors.email && errors.email.message}
                  </p>
                </div>
                {/* MobileNo */}
                <div className="mb-3">
                  <FloatingLabel
                    controlId="mobilePrimary"
                    label="Primary Mobile No."
                  >
                    <Form.Control
                      type="tel"
                      placeholder="mobilePrimary"
                      name="mobilePrimary"
                      {...register("mobilePrimary", validation.mobilePrimary)}
                    />
                  </FloatingLabel>
                  <p className="errormsg">
                    {errors.mobilePrimary && errors.mobilePrimary.message}
                  </p>
                </div>
                <div className="mb-3">
                  <FloatingLabel
                    controlId="mobileSecondary"
                    label="Secondary Mobile No."
                  >
                    <Form.Control
                      type="tel"
                      placeholder="mobileSecondary"
                      name="mobileSecondary"
                      {...register(
                        "mobileSecondary",
                        validation.mobileSecondary
                      )}
                    />
                  </FloatingLabel>
                  <p className="errormsg">
                    {errors.mobileSecondary && errors.mobileSecondary.message}
                  </p>
                </div>
              </div>
              <div>
               
              </div>
              <div className="twoCol">
                {/* Education */}
                <FloatingLabel
                  controlId="qualifications"
                  label="Educational Qualifications"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="qualifications"
                    name="qualifications"
                    {...register("qualifications")}
                  />
                </FloatingLabel>

                {/* Address */}
                <FloatingLabel
                  controlId="address"
                  label="Address"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="address"
                    name="address"
                    {...register("address")}
                  />
                </FloatingLabel>
              </div>
              <div className="twoCol">
                <FloatingLabel
                  controlId="district"
                  label="District"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="District"
                    name="district"
                    {...register("district")}
                  />
                </FloatingLabel>
                <FloatingLabel controlId="state" label="State" className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="State"
                    name="state"
                    {...register("state")}
                  />
                </FloatingLabel>
              </div>
              <div className="twoCol">
                <FloatingLabel
                  controlId="country"
                  label="Country"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Country"
                    name="country"
                    {...register("country")}
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="pincode"
                  label="Pincode"
                  className="mb-3"
                >
                  <Form.Control
                    type="tel"
                    placeholder="Pincode"
                    name="pincode"
                    {...register("pincode")}
                  />
                </FloatingLabel>
              </div>
              <div className="twoCol">
                <FloatingLabel
                  controlId="chat charges"
                  label="Chat charges"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Chat"
                    name="chat"
                    {...register("chat")}
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="call charges"
                  label="Call charges"
                  className="mb-3"
                >
                  <Form.Control
                    type="tel"
                    placeholder="Call"
                    name="call"
                    {...register("call")}
                  />
                </FloatingLabel>
              </div>
            </article>
            <hr />
            <article className="astroDetails my-3">
             
             
              <div className="mb-3 threeCol">
                <div>
                <p style={{ fontSize: "16px", textDecoration: "underline" }}>
                Methodology
              </p>
              <Dropdown>
                <Dropdown.Toggle  id="dropdown-basic" >
                  Astrology
                </Dropdown.Toggle>

                <Dropdown.Menu
                style={{width:"300px"}}
             
                >
                  {categories?.map((cat,index) => (
                    <>
                  <div key={index} style={{display:"flex",alignItems:"center",marginLeft:"5px",gap:"4px",padding:"0 5px"}}   className="customDrop">
                      <Form.Check
                       type="checkbox"
                       name="category" 
                       value={cat.category[0]?.name}
                       key={index}
                       onChange={(e)=>setCategories(e.target.value)}
                       {...register("category")}
                     
                    />  {cat.category[0]?.name}
                    {/* <Dropdown.Item className="customDrop" value={category}  {...register("category", validation.category)}>
                    </Dropdown.Item> */}
                    </div>
                    </>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              <p className="errormsg">
                    {errors.category && errors.category.message}
                  </p>
                </div>
                <div>
                <p style={{ fontSize: "16px", textDecoration: "underline" }}>
                Language
              </p>
              <Dropdown>
                <Dropdown.Toggle  id="dropdown-basic" >
                  Languages
                </Dropdown.Toggle>

                <Dropdown.Menu
                style={{width:"300px"}}
             
                >
                  {languages?.map((cat,index) => (
                    <>
                  <div style={{display:"flex",alignItems:"center",marginLeft:"5px",gap:"4px",padding:"0 5px"}}   className="customDrop">
                      <Form.Check
                       type="checkbox"
                       name="language" 
                       value={cat?.language[0]?.name}
                       key={index}
                       onChange={(e)=>setLanguages(e.target.value)}
                       {...register("language")}
                     
                    />  {cat?.language[0]?.name}
                    {/* <Dropdown.Item className="customDrop" value={category}  {...register("category", validation.category)}>
                    </Dropdown.Item> */}
                    </div>
                    </>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              <p className="errormsg">
                    {errors.language && errors.language.message}
                  </p>
                </div>
                
              </div>
            


              <p style={{ fontSize: "16px", textDecoration: "underline" }}>
                Astrology related details
              </p>

              <div className="threeCol">
                <FloatingLabel
                  controlId="experience"
                  label="Experience in Yrs"
                  className="mb-3"
                >
                  <Form.Control
                    type="number"
                    placeholder="experience"
                    name="experience"
                    {...register("experience")}
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="maxTime"
                  label="Max time spent in Astro5Star per day (in Hrs)"
                  className="mb-3"
                >
                  <Form.Control
                    type="number"
                    placeholder="maxTime"
                    name="maxTime"
                    {...register("maxTime")}
                  />
                </FloatingLabel>
                <div>
                  <FloatingLabel
                    controlId="certificates"
                    label="Course certificates"
                    className="mb-3"
                  >
                    <Form.Control
                      type="file"
                      placeholder="certificates"
                      name="certificates"
                      onChange={handleFileUpload}
                      accept="image/png, image/jpeg, .pdf"
                    />
                  </FloatingLabel>

                  {errorMessage && (
                    <p style={{ color: "red" }}>{errorMessage}</p>
                  )}
                  {certificates.map((file, index) => (
                    <p key={index}>
                      Certificate {index + 1}: {file.name}
                    </p>
                  ))}
                </div>
              </div>
              <div>
                <div className="mb-3">
                  <FloatingLabel
                    controlId="institute"
                    label="Astrology School Name/ Guru Name"
                  >
                    <Form.Control
                      as="textarea"
                      style={{ height: "100px" }}
                      placeholder="institute"
                      name="institute"
                      {...register("institute")}
                    />
                  </FloatingLabel>
                </div>
              </div>
              <div>
                <div className="mb-3">
                  <FloatingLabel
                    controlId="astrology-description"
                    label="What do you mean by Astrology? (Max 50 words)"
                  >
                    <Form.Control
                      as="textarea"
                      style={{ height: "100px" }}
                      placeholder="astrology-description"
                      name="astrologyDescription"
                      {...register(
                        "astrologyDescription",
                        validation.astrologyDescription
                      )}
                    />
                  </FloatingLabel>
                  <p className="errormsg">
                    {errors.astrologyDescription &&
                      errors.astrologyDescription.message}
                  </p>
                </div>
              </div>
              <div>
                <div className="mb-3">
                  <FloatingLabel
                    controlId="astrology-experience"
                    label="Describe about the experience you gained in Astrology? (Max 50 words)"
                  >
                    <Form.Control
                      as="textarea"
                      style={{ height: "100px" }}
                      placeholder="astrology-experience"
                      name="astrologyExperience"
                      {...register(
                        "astrologyExperience",
                        validation.astrologyExperience
                      )}
                    />
                  </FloatingLabel>
                  <p className="errormsg">
                    {errors.astrologyExperience &&
                      errors.astrologyExperience.message}
                  </p>
                </div>
              </div>
              <div>
                <div className="mb-3">
                  <FloatingLabel
                    controlId="astrology-expertise"
                    label="Describe about your individuality in Astrology? (i.e)Area of Expertise (Max 50 words)"
                  >
                    <Form.Control
                      as="textarea"
                      style={{ height: "100px" }}
                      placeholder="astrology-expertise"
                      name="astrologyExpertise"
                      {...register(
                        "astrologyExpertise",
                        validation.astrologyExpertise
                      )}
                    />
                  </FloatingLabel>
                  <p className="errormsg">
                    {errors.astrologyExpertise &&
                      errors.astrologyExpertise.message}
                  </p>
                </div>
              </div>
              <div>
                <div className="mb-3">
                  <FloatingLabel
                    controlId="Know-us"
                    label="How do you know about us?(Max 50 words)"
                  >
                    <Form.Control
                      as="textarea"
                      style={{ height: "100px" }}
                      placeholder="Know-us"
                      name="knowus"
                      {...register("knowus", validation.knowus)}
                    />
                  </FloatingLabel>
                  <p className="errormsg">
                    {errors.knowus && errors.knowus.message}
                  </p>
                </div>
              </div>

              <div className="btnGroup">
                <div>
                  <button
                    type="submit"
                    id="submitBtn"
                    className="btns"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Spinner animation="grow" className="text-center" />
                    ) : (
                      <>Submit</>
                    )}
                  </button>
                </div>
                <div>
                  <button
                    type="reset"
                    id="clearBtn"
                    className="btns"
                    disabled={isLoading}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </article>
          </Form>
        </section>
      </main>
    </div>
  );
}

export default Addastrologers;
