import { Link, useNavigate, useParams } from "react-router-dom";
import "../../Stylesheets/Addastrologer.scss";
import { Box } from "@mui/material";
import { FloatingLabel, Form, Spinner, Dropdown } from "react-bootstrap";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";
import { RiCloseCircleLine } from "react-icons/ri";
import MetaData from "../../Components/MetaData";
import { toast } from "react-toastify";

function EditAstrologer() {
  //upload images
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
                // required
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
  const [isLoading, setIsloading] = useState(false);
  const [categories, setCategories] = useState(null);
  const [languages, setLanguages] = useState(null);
  const [isActive, setIsActive] = useState(true);
  const { token } = useSelector((state) => state.authState);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [photoErr, setPhotoErr] = useState("");
  const [astrologers, setAstrologers] = useState({
    firstname: "",
    lastname: "",
    gender: "",
    email: "",
    mobilePrimary: "",
    mobileSecondary: "",
    qualifications: "",
    address: "",
    district: "",
    state: "",
    country: "",
    pincode: "",
    institute: "",
    experience: "",
    category: "",
    language: "",
    astrologyDescription: "",
    astrologyExperience: "",
    astrologyExpertise: "",
    knowus: "",
    maxTime: "",
    isActive: "",
    call: "",
    chat: "",
    certificatePic: [],
    aadharPic: [],
    panPic: [],
    profilePic: [],
  });
  const [dob, setDob] = useState(null);
  const [doberr, setDoberr] = useState(false);
  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    gender: "",
    email: "",
    mobilePrimary: "",
    mobileSecondary: "",
    qualifications: "",
    address: "",
    district: "",
    state: "",
    country: "",
    category: [],
    language: [],
    pincode: "",
    institute: "",
    experience: "",
    astrologyDescription: "",
    astrologyExperience: "",
    astrologyExpertise: "",
    knowus: "",
    maxTime: "",
    isActive: "",
    call: "",
    chat: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validation logic
    let error = "";
    if (name === "firstname" && value.length === 0) {
      error = "Firstname is required";
    } else if (name === "lastname" && value.length === 0) {
      error = "Lastname is required";
    } else if (name === "gender" && !value) {
      error = "Please select a gender";
    } else if (
      name === "email" &&
      !/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(value)
    ) {
      error = "Invalid email address";
    } else if (
      name === "mobilePrimary" &&
      !/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(value)
    ) {
      error = "Invalid Primary mobile number";
    } else if (
      name === "mobileSecondary" &&
      !/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(value)
    ) {
      error = "Invalid Secondary mobile number";
    } else if (
      name === "astrologyDescription" &&
      value.split(" ").length > 50
    ) {
      error = "Describe in 50 Words";
    } else if (name === "astrologyExperience" && value.split(" ").length > 50) {
      error = "Describe in 50 Words";
    } else if (name === "astrologyExpertise" && value.split(" ").length > 50) {
      error = "Describe in 50 Words";
    } else if (name === "knowus" && value.split(" ").length > 50) {
      error = "Describe in 50 Words";
    }

    setErrors({
      ...errors,
      [name]: error,
    });

    setAstrologers({
      ...astrologers,
      [name]: value,
    });
  };

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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URL}/api/v1/astrologer/getAstrologer/${id}`,
          {
            headers: {
              "Content-type": "multipart/form-data",
              // Authorization: `Bearer ${token}`
            },
            method: "GET",
          }
        );

        if (!response.ok) {
          // Handle non-successful response (e.g., 404 Not Found)
          console.error(`Error: ${response.status} - ${response.statusText}`);
          return;
        }

        const data = await response.json();
        console.log(data);
        setAstrologers(data?.astrologer);
        console.log("astro", astrologers);
        setDob(dayjs(data?.astrologer?.dob));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const handleFileChange = (files) => {
    setUploadedFiles(files);
    console.log("files", uploadedFiles);
    setPhotoErr("");
  };
  const handleAadharDelete = (name) => {
    setAstrologers((prevAstrologers) => ({
      ...prevAstrologers,
      aadharPic: prevAstrologers.aadharPic?.filter((pic) => pic.name !== name),
    }));
  };
  const handlePanDelete = (name) => {
    setAstrologers((prevAstrologers) => ({
      ...prevAstrologers,
      panPic: prevAstrologers.panPic?.filter((pic) => pic.name !== name),
    }));
  };
  const handleCertificateDelete = (name) => {
    setAstrologers((prevAstrologers) => ({
      ...prevAstrologers,
      certificatePic: prevAstrologers.certificatePic?.filter(
        (pic) => pic.name !== name
      ),
    }));
  };
  const handleFileDelete = (name) => {
    const imagesCleared = true;
    setAstrologers((prevAstrologers) => ({
      ...prevAstrologers,
      profilePic: prevAstrologers.profilePic?.filter(
        (pic) => pic.name !== name
      ),
    }));
    return imagesCleared;
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setIsloading(true);
    try {
      if (dob) {
        const updatedDetails = new FormData();
        updatedDetails.append("firstname", astrologers.firstname);
        updatedDetails.append("lastname", astrologers.lastname);
        updatedDetails.append("gender", astrologers.gender);
        updatedDetails.append("email", astrologers.email);
        updatedDetails.append("mobilePrimary", astrologers.mobilePrimary);
        updatedDetails.append("mobileSecondary", astrologers.mobileSecondary);
        updatedDetails.append("isActive", astrologers.isActive);
        updatedDetails.append("dob", dob);
        updatedDetails.append("qualifications", astrologers.qualifications);
        updatedDetails.append("address", astrologers.address);
        updatedDetails.append("district", astrologers.district);
        updatedDetails.append("state", astrologers.state);
        updatedDetails.append("country", astrologers.country);
        updatedDetails.append("pincode", astrologers.pincode);
        updatedDetails.append("call", astrologers.call);
        updatedDetails.append("chat", astrologers.chat);
        updatedDetails.append("category", astrologers.category);
        updatedDetails.append("language", astrologers.language);
        updatedDetails.append("institute", astrologers.institute);
        updatedDetails.append("experience", astrologers.experience);
        updatedDetails.append(
          "astrologyDescription",
          astrologers.astrologyDescription
        );
        updatedDetails.append(
          "astrologyExperience",
          astrologers.astrologyExperience
        );
        updatedDetails.append(
          "astrologyExpertise",
          astrologers.astrologyExpertise
        );
        updatedDetails.append("knowus", astrologers.knowus);
        updatedDetails.append("maxTime", astrologers.maxTime);

        uploadedFiles.forEach((uploadedFile) => {
          const fieldName = uploadedFile.type.toLowerCase() + "Pic";

          // Create a JSON object with file and imagesCleared
          const fileData = {
            // file: uploadedFile.file,
            imagesCleared: handleFileDelete(uploadedFile.name),
          };
          updatedDetails.append(fieldName, uploadedFile.file);

          // Convert the JSON object to a string and append it to FormData
          updatedDetails.append(fieldName, JSON.stringify(fileData));
        });

        const response = await fetch(
          `${process.env.REACT_APP_URL}/api/v1/astrologer/update/${id}`,
          {
            method: "PUT",
            body: updatedDetails,
          }
        );

        console.log(response);
        if (response.ok === false) {
          alert("Updated failed");
          setIsloading(false);
        } else {
          alert("Updated successfully");
          navigate(`/astrologer/${id}`);
        }
        setUploadedFiles([]);
      } else {
        setDoberr(true);
        setIsloading(false);
      }
    } catch (error) {
      console.error("Error during course update:", error);

      // Check if the error object has a response or data property
      const errorMessage =
        error.response?.data?.message || "Fill all the fields";

      toast(errorMessage, {
        position: toast.POSITION.TOP_RIGHT,
        type: "error",
      });
    }
  };

  return (
    <div className="infoContainer">
      <MetaData title={"Astro5Star-Manager"} />

      <main id="admin-addastro">
        <section className="astro-head">
          <div>
            <h3>Astrologer Update</h3>
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
            onSubmit={onSubmit}
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
                      value={astrologers?.firstname}
                      onChange={handleChange}
                    />
                  </FloatingLabel>
                  {errors.firstname && (
                    <p className="errormsg">{errors.firstname}</p>
                  )}
                </div>

                {/* lastName */}
                <div className="mb-3">
                  <FloatingLabel controlId="lastname" label="Last Name">
                    <Form.Control
                      type="text"
                      placeholder="lastname"
                      name="lastname"
                      value={astrologers?.lastname}
                      onChange={handleChange}
                    />
                  </FloatingLabel>
                  {errors.lastname && (
                    <p className="errormsg">{errors.lastname}</p>
                  )}
                </div>
                <div className="mb-3">
                  <FloatingLabel controlId="displayname" label="display Name">
                    <Form.Control
                      type="text"
                      placeholder="displayname"
                      name="displayname"
                      value={astrologers?.displayname}
                      onChange={handleChange}
                    />
                  </FloatingLabel>
                  {errors.lastname && (
                    <p className="errormsg">{errors.lastname}</p>
                  )}
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

                {/* isActive */}
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
                    value={true}
                    checked={astrologers?.isActive == true}

                    // {...register("isActive")}
                  />
                  <Form.Check
                    type="radio"
                    label="No"
                    name="isActive"
                    inline
                    id="inline-radio-2"
                    value={false}
                    checked={astrologers?.isActive == false}

                    // {...register("isActive")}
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
                      checked={astrologers?.gender === "male"}

                      // {...register("gender", validation.gender)}
                    />
                    <Form.Check
                      type="radio"
                      label="Female"
                      name="gender"
                      // inline
                      id="inline-radio-2"
                      value="female"
                      checked={astrologers?.gender === "female"}
                      // {...register("gender", validation.gender)}
                    />
                    <Form.Check
                      type="radio"
                      label="Others"
                      name="gender"
                      // inline
                      id="inline-radio-3"
                      value="others"
                      checked={astrologers?.gender === "others"}

                      // {...register("gender", validation.gender)}
                    />
                  </div>
                  <p className="errormsg">
                    {errors.gender && errors.gender.message}
                  </p>
                </div>
              </div>
              <div className="threeCol">
                {/* profile image */}
                <div className="mb-3">
                  <Form.Group>
                    <div
                      style={{
                        position: "relative",
                        overflow: "hidden",
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                      className="pic-lable"
                    >
                      <FileUpload
                        label="Profile"
                        name="profilePic"
                        onChange={handleFileChange}
                        acceptedTypes="image/png, image/jpeg"
                        files={uploadedFiles.filter(
                          (file) => file.type === "Profile"
                        )}
                        error={photoErr}
                        handleFileDelete={(name) =>
                          handleFileDelete(name, "profilePic")
                        }
                      />
                      {astrologers?.profilePic?.map((pic, index) => (
                        <div
                          key={index}
                          style={{
                            position: "relative",
                            display: "inline-block",
                          }}
                        >
                          <img
                            src={pic.pic}
                            alt=""
                            style={{ width: "75px", height: "50px" }}
                          />

                          <RiCloseCircleLine
                            className="trash"
                            onClick={() => handleFileDelete()}
                          />
                        </div>
                      ))}
                    </div>
                  </Form.Group>
                </div>
                {/* Aadhar photo */}
                <div className="mb-3">
                  <Form.Group>
                    <div
                      style={{
                        position: "relative",
                        overflow: "hidden",
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                      className="pic-lable"
                    >
                      <FileUpload
                        label="Aadhar"
                        required
                        onChange={handleFileChange}
                        acceptedTypes="image/png, image/jpeg"
                        files={uploadedFiles.filter(
                          (file) => file.type === "Aadhar"
                        )}
                        error={photoErr}
                        handleFileDelete={(name) =>
                          handleAadharDelete(name, "aadharPic")
                        }
                      />
                      {astrologers?.aadharPic?.map((pic, index) => (
                        <div
                          key={index}
                          style={{
                            position: "relative",
                            display: "inline-block",
                          }}
                        >
                          <img
                            src={pic.pic}
                            alt=""
                            style={{ width: "75px", height: "50px" }}
                          />

                          <RiCloseCircleLine
                            className="trash"
                            onClick={() => handleAadharDelete()}
                          />
                        </div>
                      ))}
                    </div>
                  </Form.Group>
                </div>
                {/* Pan card Image */}
                <div className="mb-3">
                  <Form.Group>
                    <div
                      style={{
                        position: "relative",
                        overflow: "hidden",
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                      className="pic-lable"
                    >
                      <FileUpload
                        label="Pan"
                        required
                        onChange={handleFileChange}
                        acceptedTypes="image/png, image/jpeg"
                        files={uploadedFiles.filter(
                          (file) => file.type === "Pan"
                        )}
                        error={photoErr}
                        handleFileDelete={(name) =>
                          handlePanDelete(name, "panPic")
                        }
                      />
                      {!uploadedFiles.some((file) => file.type === "Pan") &&
                        astrologers?.panPic?.map((pic, index) => (
                          <div
                            key={index}
                            style={{
                              position: "relative",
                              display: "inline-block",
                            }}
                          >
                            <img
                              src={pic.pic}
                              alt=""
                              style={{ width: "75px", height: "50px" }}
                            />

                            <RiCloseCircleLine
                              className="trash"
                              onClick={() => handlePanDelete()}
                            />
                          </div>
                        ))}
                    </div>
                  </Form.Group>
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
                      value={astrologers?.email}
                      onChange={handleChange}
                    />
                  </FloatingLabel>
                  {errors.email && <p className="errormsg">{errors.email}</p>}
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
                      value={astrologers?.mobilePrimary}
                      onChange={handleChange}
                    />
                  </FloatingLabel>
                  {errors.mobilePrimary && (
                    <p className="errormsg">{errors.mobilePrimary}</p>
                  )}
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
                      value={astrologers?.mobileSecondary}
                      onChange={handleChange}
                    />
                  </FloatingLabel>
                  {errors.mobileSecondary && (
                    <p className="errormsg">{errors.mobileSecondary}</p>
                  )}
                </div>
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
                    value={astrologers?.qualifications}
                    onChange={handleChange}
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
                    value={astrologers?.address}
                    onChange={handleChange}
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
                    value={astrologers?.district}
                    onChange={handleChange}
                  />
                </FloatingLabel>
                <FloatingLabel controlId="state" label="State" className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="State"
                    name="state"
                    value={astrologers?.state}
                    onChange={handleChange}
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
                    value={astrologers?.country}
                    onChange={handleChange}
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
                    value={astrologers?.pincode}
                    onChange={handleChange}
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
                    value={astrologers?.chat}
                    onChange={handleChange}
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="call charges"
                  label="Call charges"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Call"
                    name="call"
                    value={astrologers?.call}
                    onChange={handleChange}
                  />
                </FloatingLabel>
              </div>
              <div className="mb-3 threeCol">
                <div>
                  <p style={{ fontSize: "16px", textDecoration: "underline" }}>
                    Methodology
                  </p>
                  <FloatingLabel
                    controlId="methodolgy"
                    label="Methodology"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Methodology"
                      name="methodology"
                      value={astrologers?.category[0]}
                      onChange={handleChange}
                    />
                  </FloatingLabel>
                  <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic">
                      Astrology
                    </Dropdown.Toggle>

                    <Dropdown.Menu style={{ width: "300px" }}>
                      {categories?.map((cat, index) => (
                        <>
                          <div
                            key={index}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginLeft: "5px",
                              gap: "4px",
                              padding: "0 5px",
                            }}
                            className="customDrop"
                          >
                            <Form.Check
                              type="checkbox"
                              name="category"
                              value={cat?.category[0]?.name}
                              key={index}
                              onChange={handleChange}
                            />{" "}
                            {cat.category[0]?.name}
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
                  <FloatingLabel
                    controlId="language"
                    label="Language"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Language"
                      name="language"
                      value={astrologers?.language[0]}
                      onChange={handleChange}
                    />
                  </FloatingLabel>
                  <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic">
                      Languages
                    </Dropdown.Toggle>

                    <Dropdown.Menu style={{ width: "300px" }}>
                      {languages?.map((cat, index) => (
                        <>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginLeft: "5px",
                              gap: "4px",
                              padding: "0 5px",
                            }}
                            className="customDrop"
                          >
                            <Form.Check
                              type="checkbox"
                              name="language"
                              value={cat?.language[0]?.name}
                              key={index}
                              onChange={handleChange}
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
            </article>
            <hr />
            <article className="astroDetails my-3">
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
                    value={astrologers?.experience}
                    onChange={handleChange}
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
                    value={astrologers?.maxTime}
                    onChange={handleChange}
                  />
                </FloatingLabel>
                <div className="mb-3">
                  <Form.Group>
                    <div
                      style={{
                        position: "relative",
                        overflow: "hidden",
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                      className="pic-lable"
                    >
                      <FileUpload
                        label="Certificate"
                        onChange={handleFileChange}
                        required
                        acceptedTypes="image/png, image/jpeg"
                        files={uploadedFiles.filter(
                          (file) => file.type === "Certificate"
                        )}
                        error={photoErr}
                        handleFileDelete={(name) =>
                          handleCertificateDelete(name, "certificatePic")
                        }
                      />
                      {astrologers?.certificatePic?.map((pic, index) => (
                        <div
                          key={index}
                          style={{
                            position: "relative",
                            display: "inline-block",
                          }}
                        >
                          <img
                            src={pic.file}
                            alt=""
                            style={{ width: "75px", height: "50px" }}
                          />

                          <RiCloseCircleLine
                            className="trash"
                            onClick={() => handleCertificateDelete()}
                          />
                        </div>
                      ))}
                    </div>
                  </Form.Group>
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
                      value={astrologers?.institute}
                      onChange={handleChange}
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
                      value={astrologers?.astrologyDescription}
                      onChange={handleChange}
                    />
                  </FloatingLabel>
                  {errors.astrologyDescription && (
                    <p className="errormsg">{errors.astrologyDescription}</p>
                  )}
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
                      value={astrologers?.astrologyExperience}
                      onChange={handleChange}
                    />
                  </FloatingLabel>
                  {errors.astrologyExperience && (
                    <p className="errormsg">{errors.astrologyExperience}</p>
                  )}
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
                      value={astrologers?.astrologyExpertise}
                      onChange={handleChange}
                    />
                  </FloatingLabel>
                  {errors.astrologyExpertise && (
                    <p className="errormsg">{errors.astrologyExpertise}</p>
                  )}
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
                      value={astrologers?.knowus}
                      onChange={handleChange}
                    />
                  </FloatingLabel>
                  {errors.knowus && <p className="errormsg">{errors.knowus}</p>}
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
                  <button type="reset" id="clearBtn" className="btns">
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

export default EditAstrologer;
