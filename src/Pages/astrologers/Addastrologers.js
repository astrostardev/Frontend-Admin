import { Link, Navigate } from "react-router-dom";
import "../../Stylesheets/Addastrologer.scss";
import { Box } from "@mui/material";
import React from "react";
import {
  FloatingLabel,
  Form,
  Dropdown,
  ButtonGroup,
  Button,
  Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { v4 as uuid } from "uuid";
import { useSelector } from "react-redux";
import MetaData from "../../Components/MetaData";
function Addastrologers() {
  // file upload component
  const FileUpload = ({
    label,
    onChange,
    acceptedTypes,
    name,
    files,
    error,
  }) => {
    const handleFileUpload = (e) => {
      const selectedFiles = Array.from(e.target.files);

      selectedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            onChange((prevFiles) => [
              ...prevFiles,
              { type: label, file, name },
            ]);
          }
        };
        reader.readAsDataURL(file);
      });
    };

    return (
      <div className="mb-3">
        <Form.Group>
          <FloatingLabel controlId={label}>
            <div
              style={{
                position: "relative",
                overflow: "hidden",
                width: "100%",
              }}
            >
              <input
                type="file"
                placeholder={`${label} Photo`}
                name={name}
                onChange={handleFileUpload}
                accept={acceptedTypes}
                className="pic-input"
              />
              <label className="pic-label">Choose {label}</label>
            </div>
          </FloatingLabel>
        </Form.Group>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {files.map((uploadedFile, index) => (
          <p key={index}>
            {uploadedFile.type} Image {index + 1}: {uploadedFile.file.name}
          </p>
        ))}
      </div>
    );
  };

  const [dob, setDob] = useState(null);
  const [doberr, setDoberr] = useState(false);
  const [photoErr, setPhotoErr] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [categories, setCategories] = useState(null);
  const [languages, setLanguages] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.authState);

  // get category

  useEffect(() => {
    async function fetchData() {
      let response = await fetch(
        `${process.env.REACT_APP_URL}/api/v1/method/show`,
        {
          headers: {
            "Content-type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          method: "GET",
        }
      );
      // console.log(response);
      let data = await response.json();
      console.log(data);
      setIsloading(false);
      setCategories(data.categories);
      console.log(categories);
    }
    fetchData();
  }, []);

  // get languages
  useEffect(() => {
    async function fetchData() {
      let response = await fetch(
        `${process.env.REACT_APP_URL}/api/v1/language/show`,
        {
          headers: {
            "Content-type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          method: "GET",
        }
      );
      // console.log(response);
      let data = await response.json();
      console.log(data);
      setIsloading(false);
      setLanguages(data.languages);
      console.log(languages);
    }
    fetchData();
  }, []);

  const {
    register,
    handleSubmit,
     reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

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
    biograph: {
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
// file upload function
  const handleFileChange = (files) => {
    setUploadedFiles(files);
    console.log("files", uploadedFiles);
    setPhotoErr("");
  };
  // submit function
  const onSubmit = async (data) => {
    setIsloading(true);
    if (dob) {
      const astrologerDetails = new FormData();

      Object.keys(data).forEach((key) => {
        astrologerDetails.set(key, data[key]);
      });
      astrologerDetails.set("dob", dob);

      uploadedFiles.forEach((uploadedFile) => {
        const fieldName = uploadedFile.type.toLowerCase() + "Pic";
        console.log("feild name", fieldName, "files", uploadedFile.file);
        // console.log('file',uploadedFile.file);

        astrologerDetails.append(fieldName, uploadedFile.file);
      });

      const astroID = uuid().slice(0, 6).toUpperCase();
      astrologerDetails.set("astrologerID", astroID);
      if (!data) {
        console.error("no data");
        return;
      } else {
        console.log("lf", astrologerDetails);
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
      console.log("res", jsonResponse);
      if (response.ok === false) {
        alert("Registration Failed");
      } else {
        alert("Registration Successful");
        navigate("/astrologers");
      }
      setIsloading(false);
      setDob(null);
      setUploadedFiles([]);
    } else {
      setDoberr(true);
      setIsloading(false);
    }
  };
  return (
    <div className="infoContainer">
      <MetaData title={"Astro5Star-Manager"} />

      <main id="admin-addastro">
        <section className="astro-head">
          <div>
            <h3>Astrologer Registration</h3>
            <div className="title_divider"></div>
          </div>
        </section>
        <section className="my-4">
          <Form
            className="reg-form"
            onSubmit={handleSubmit(onSubmit)}
            encType="multipart/form-data"
          >
            <article className="basicDetails">
              <p className="title_addastro">Basic details</p>
              {/* Name field */}
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
                <div className="mb-3">
                  <FloatingLabel controlId="displayname" label="Display Name">
                    <Form.Control
                      type="text"
                      placeholder="displayname"
                      name="displayname"
                      {...register("displayname", validation.displayname)}
                    />
                  </FloatingLabel>
                  <p className="errormsg">
                    {errors.lastname && errors.lastname.message}
                  </p>
                </div>
              </div>
              {/* dob field */}
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

                {/* isActive */}
                <div className="mx-2">
                  <Form.Label className="me-3" id="display_btn">
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
                {/* Gender */}
                <div className="mb-3">
                  <Form.Label className="me-3">Select Gender</Form.Label>
                  <div className="check-btn">
                    <Form.Check
                      type="radio"
                      label="Male"
                      name="gender"
                      // inline
                      id="inline-radio-1"
                      value="male"
                      {...register("gender", validation.gender)}
                    />
                    <Form.Check
                      type="radio"
                      label="Female"
                      name="gender"
                      // inline
                      id="inline-radio-2"
                      value="female"
                      {...register("gender", validation.gender)}
                    />
                    <Form.Check
                      type="radio"
                      label="Others"
                      name="gender"
                      // inline
                      id="inline-radio-3"
                      value="others"
                      {...register("gender", validation.gender)}
                    />
                  </div>
                  <p className="errormsg">
                    {errors.gender && errors.gender.message}
                  </p>
                </div>
              </div>
              {/* Images Field */}
              <div className="threeCol">
                {/* profile image */}
                <div className="mb-3">
                  <Form.Group>
                    <div className="pic-lable">
                      <FileUpload
                        label="Profile"
                        name="profilePic"
                        onChange={handleFileChange}
                        acceptedTypes="image/png, image/jpeg"
                        files={uploadedFiles.filter(
                          (file) => file.type === "Profile"
                        )}
                        error={photoErr}
                      />
                    </div>
                  </Form.Group>
                </div>
                {/* Aadhar photo */}
                <div className="mb-3">
                  <Form.Group>
                    <div className="pic-lable">
                      <FileUpload
                        label="Aadhar"
                        onChange={handleFileChange}
                        acceptedTypes="image/png, image/jpeg"
                        files={uploadedFiles.filter(
                          (file) => file.type === "Aadhar"
                        )}
                        error={photoErr}
                      />
                    </div>
                  </Form.Group>
                </div>
                {/* Pan card Image */}
                <div className="mb-3">
                  <Form.Group>
                    <div className="pic-lable">
                      <FileUpload
                        label="Pan"
                        onChange={handleFileChange}
                        acceptedTypes="image/png, image/jpeg"
                        files={uploadedFiles.filter(
                          (file) => file.type === "Pan"
                        )}
                        error={photoErr}
                      />
                    </div>
                  </Form.Group>
                </div>
              </div>
              {/* contact field */}
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
              {/* Address field */}
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
              {/* charges */}
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
              {/* display charges */}
              <div className="twoCol">
                <FloatingLabel
                  controlId="chat charges"
                  label="Chat charges(display)"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Chat"
                    name="displaychat"
                    {...register("displaychat")}
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="call charges"
                  label="Call charges(display)"
                  className="mb-3"
                >
                  <Form.Control
                    type="tel"
                    placeholder="Call"
                    name="displaycall"
                    {...register("displaycall")}
                  />
                </FloatingLabel>
              </div>
            </article>
            <hr />
            <article className="astroDetails my-3">
              {/* select methods and language */}
              <div className="mb-3 threeCol">
                <div>
                  <p className="title_addastro">Methodology</p>
                  <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic">
                      Astrology
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="drop_menu">
                      {categories?.map((cat, index) => (
                        <>
                          <div key={index} className="customDrop">
                            <Form.Check
                              type="checkbox"
                              name="category"
                              value={cat.category[0]?.name}
                              key={index}
                              onChange={(e) => setCategories(e.target.value)}
                              {...register("category")}
                            />{" "}
                            {cat.category[0]?.name}
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
                  <p className="title_addastro">Language</p>
                  <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic">
                      Languages
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="drop_menu">
                      {languages?.map((cat, index) => (
                        <>
                          <div className="customDrop">
                            <Form.Check
                              type="checkbox"
                              name="language"
                              value={cat?.language[0]?.name}
                              key={index}
                              onChange={(e) => setLanguages(e.target.value)}
                              {...register("language")}
                            />{" "}
                            {cat?.language[0]?.name}
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
              {/* Astrologer details */}
              <p className="title_addastro">Astrology related details</p>

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
                  label="Max time spent in Astro5Star per day (Hrs)"
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
                  <div className="mb-3">
                    <Form.Group>
                      <div className="pic-lable">
                        <FileUpload
                          label="Certificate"
                          onChange={handleFileChange}
                          acceptedTypes="application/pdf, image/png, image/jpeg"
                          files={uploadedFiles.filter(
                            (file) => file.type === "Certificate"
                          )}
                          error={photoErr}
                        />
                      </div>
                    </Form.Group>
                  </div>
                </div>
              </div>
              {/* biography */}
              <div className="mb-3">
                <FloatingLabel
                  controlId="astrology-description"
                  label="Biograph  (Max 50 words)"
                >
                  <Form.Control
                    as="textarea"
                    className="area_height"
                    placeholder="astrology-description"
                    name="biograph"
                    {...register("biograph", validation.biograph)}
                  />
                </FloatingLabel>
                <p className="errormsg">
                  {errors.biograph && errors.biograph.message}
                </p>
              </div>
              {/* institute */}
              <div className="mb-3">
                <FloatingLabel
                  controlId="institute"
                  label="Astrology School Name/ Guru Name"
                >
                  <Form.Control
                    as="textarea"
                    className="area_height"
                    placeholder="institute"
                    name="institute"
                    {...register("institute")}
                  />
                </FloatingLabel>
              </div>
              {/* description */}

              <div className="mb-3">
                <FloatingLabel
                  controlId="astrology-description"
                  label="What do you mean by Astrology? (Max 50 words)"
                >
                  <Form.Control
                    as="textarea"
                    className="area_height"
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
              {/* experience */}

              <div className="mb-3">
                <FloatingLabel
                  controlId="astrology-experience"
                  label="Describe about the experience you gained in Astrology? (Max 50 words)"
                >
                  <Form.Control
                    as="textarea"
                    className="area_height"
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
              {/* area expertise */}

              <div className="mb-3">
                <FloatingLabel
                  controlId="astrology-expertise"
                  label="Describe about your individuality in Astrology? (i.e)Area of Expertise (Max 50 words)"
                >
                  <Form.Control
                    as="textarea"
                    className="area_height"
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

              {/* how do u know us */}
              <div className="mb-3">
                <FloatingLabel
                  controlId="Know-us"
                  label="How do you know about us?(Max 50 words)"
                >
                  <Form.Control
                    as="textarea"
                    className="area_height"
                    placeholder="Know-us"
                    name="knowus"
                    {...register("knowus", validation.knowus)}
                  />
                </FloatingLabel>
                <p className="errormsg">
                  {errors.knowus && errors.knowus.message}
                </p>
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
