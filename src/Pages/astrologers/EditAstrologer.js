import { useNavigate, useParams } from "react-router-dom";
import "../../Stylesheets/Addastrologer.scss";
import { FloatingLabel, Form, Spinner, Dropdown } from "react-bootstrap";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { RiCloseCircleLine } from "react-icons/ri";
import MetaData from "../../Components/MetaData";
import { toast } from "react-toastify";

function EditAstrologer() {
  //upload images components
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
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState([]);
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
    displaycall: "",
    displaychat: "",
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
  // uploading file
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
  // get categories
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
  //get languages
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
  // get single astrologer
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
        setIsloading(false)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  // uploading images
  const handleFileChange = (files) => {
    setUploadedFiles(files);
    console.log("files", uploadedFiles);
    setPhotoErr("");
  };
  // delete Aadhar
  const handleAadharDelete = (name) => {
    setAstrologers((prevAstrologers) => ({
      ...prevAstrologers,
      aadharPic: prevAstrologers.aadharPic?.filter((pic) => pic.name !== name),
    }));
  };
  // delete Pancard
  const handlePanDelete = (name) => {
    setAstrologers((prevAstrologers) => ({
      ...prevAstrologers,
      panPic: prevAstrologers.panPic?.filter((pic) => pic.name !== name),
    }));
  };
  // delete certificate
  const handleCertificateDelete = (name) => {
    setAstrologers((prevAstrologers) => ({
      ...prevAstrologers,
      certificatePic: prevAstrologers.certificatePic?.filter(
        (pic) => pic.name !== name
      ),
    }));
  };
  // delete profile photo
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
  // edit astrologer function
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
        updatedDetails.append("displaychat", astrologers.displaychat);
        updatedDetails.append("displaycall", astrologers.displaycall);
        selectedLanguages.forEach((lang) => {
          updatedDetails.append("language", lang);
        });
        selectedCategories.forEach((cate) => {
          updatedDetails.append("category", cate);
        });
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
          const fileData = {
            imagesCleared: handleFileDelete(uploadedFile.name),
          };
          updatedDetails.append(fieldName, uploadedFile.file);
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
  //handle change function for selectedCategory to dispaly
  const handleChangeCategory = (event) => {
    const categoryName = event.target.name;

    if (selectedCategories.includes(categoryName)) {
      setSelectedCategories((prevSelectedLanguages) =>
        prevSelectedLanguages.filter((lang) => lang !== categoryName)
      );
    } else {
      setSelectedCategories((prevSelectedCategories) => [
        ...prevSelectedCategories,
        categoryName,
      ]);
    }
  };
  //selected for displaying
  const handleDropdownSelectCategory = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
    console.log("selected Category", selectedCategory);
  };

  //handle change function for selectedLanguages dispaly
  const handleChangeLanguage = (event) => {
    const languageName = event.target.name;

    if (selectedLanguages.includes(languageName)) {
      setSelectedLanguages((prevSelectedLanguages) =>
        prevSelectedLanguages.filter((lang) => lang !== languageName)
      );
    } else {
      setSelectedLanguages((prevSelectedLanguages) => [
        ...prevSelectedLanguages,
        languageName,
      ]);
    }
    console.log("languages", selectedLanguages);

    console.log("language name", languageName);
  };
  const handleDropdownSelectLanguages = (selectedLanguage) => {
    setSelectedLanguage(selectedLanguage);
    console.log("selected Category", selectedLanguage);
  };

  return (
    <div className="infoContainer">
      <MetaData title={"Astro5Star-Manager"} />

      <main id="admin-addastro">
        <section className="astro-head">
          <div>
            <h3>Astrologer Update</h3>
            <div className="title_divider"></div>
          </div>
        </section>
        {isLoading ? (
          <div className="loading">
            <Spinner
              animation="grow"
              variant="warning"
              className="text-center"
            />
          </div>
        ) : (
          <section className="my-4">
            <Form
              className="reg-form"
              onSubmit={onSubmit}
              encType="multipart/form-data"
            >
              <article className="basicDetails">
                <p className="title_addastro">Basic details</p>
                {/* name fields */}
                <div className="threeCol">
                  {/* FirstName */}
                  <div className="mb-3">
                    <FloatingLabel controlId="firstname" label="First Name">
                      <Form.Control
                        type="text"
                        placeholder="firstname"
                        name="firstname"
                        value={astrologers.firstname}
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
                        value={astrologers.lastname}
                        onChange={handleChange}
                      />
                    </FloatingLabel>
                    {errors.lastname && (
                      <p className="errormsg">{errors.lastname}</p>
                    )}
                  </div>
                  {/* display name */}
                  <div className="mb-3">
                    <FloatingLabel controlId="displayname" label="display Name">
                      <Form.Control
                        type="text"
                        placeholder="displayname"
                        name="displayname"
                        value={astrologers.displayname}
                        onChange={handleChange}
                      />
                    </FloatingLabel>
                    {errors.lastname && (
                      <p className="errormsg">{errors.lastname}</p>
                    )}
                  </div>
                </div>
                {/* about astrologer  dob, status and gender*/}
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
                      value={true}
                      checked={astrologers.isActive == true}

                      // {...register("isActive")}
                    />
                    <Form.Check
                      type="radio"
                      label="No"
                      name="isActive"
                      inline
                      id="inline-radio-2"
                      value={false}
                      checked={astrologers.isActive == false}

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
                        checked={astrologers.gender === "male"}

                        // {...register("gender", validation.gender)}
                      />
                      <Form.Check
                        type="radio"
                        label="Female"
                        name="gender"
                        // inline
                        id="inline-radio-2"
                        value="female"
                        checked={astrologers.gender === "female"}
                        // {...register("gender", validation.gender)}
                      />
                      <Form.Check
                        type="radio"
                        label="Others"
                        name="gender"
                        // inline
                        id="inline-radio-3"
                        value="others"
                        checked={astrologers.gender === "others"}

                        // {...register("gender", validation.gender)}
                      />
                    </div>
                    <p className="errormsg">
                      {errors.gender && errors.gender.message}
                    </p>
                  </div>
                </div>
                {/* images filed */}
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
                          handleFileDelete={(name) =>
                            handleFileDelete(name, "profilePic")
                          }
                        />
                        {astrologers.profilePic.map((pic, index) => (
                          <div key={index} className="image_contain">
                            <img src={pic.pic} alt="" className="image_pre" />

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
                      <div className="pic-lable">
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
                        {astrologers.aadharPic.map((pic, index) => (
                          <div key={index} className="image_contain">
                            <img src={pic.pic} alt="" className="image_pre" />
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
                      <div className="pic-lable">
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
                          astrologers.panPic.map((pic, index) => (
                            <div key={index} className="image_contain">
                              <img src={pic.pic} alt="" className="image_pre" />
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
                {/* contact fields */}
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
                        value={astrologers.email}
                        onChange={handleChange}
                      />
                    </FloatingLabel>
                    {errors.email && <p className="errormsg">{errors.email}</p>}
                  </div>
                  {/* MobileNo primary */}
                  <div className="mb-3">
                    <FloatingLabel
                      controlId="mobilePrimary"
                      label="Primary Mobile No."
                    >
                      <Form.Control
                        type="tel"
                        placeholder="mobilePrimary"
                        name="mobilePrimary"
                        value={astrologers.mobilePrimary}
                        onChange={handleChange}
                      />
                    </FloatingLabel>
                    {errors.mobilePrimary && (
                      <p className="errormsg">{errors.mobilePrimary}</p>
                    )}
                  </div>
                  {/* MobileNo secondary */}
                  <div className="mb-3">
                    <FloatingLabel
                      controlId="mobileSecondary"
                      label="Secondary Mobile No."
                    >
                      <Form.Control
                        type="tel"
                        placeholder="mobileSecondary"
                        name="mobileSecondary"
                        value={astrologers.mobileSecondary}
                        onChange={handleChange}
                      />
                    </FloatingLabel>
                    {errors.mobileSecondary && (
                      <p className="errormsg">{errors.mobileSecondary}</p>
                    )}
                  </div>
                </div>
                {/* address field */}
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
                      value={astrologers.qualifications}
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
                      value={astrologers.address}
                      onChange={handleChange}
                    />
                  </FloatingLabel>
                </div>
                <div className="twoCol">
                  {/* district */}
                  <FloatingLabel
                    controlId="district"
                    label="District"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      placeholder="District"
                      name="district"
                      value={astrologers.district}
                      onChange={handleChange}
                    />
                  </FloatingLabel>
                  {/* district */}
                  <FloatingLabel
                    controlId="state"
                    label="State"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      placeholder="State"
                      name="state"
                      value={astrologers.state}
                      onChange={handleChange}
                    />
                  </FloatingLabel>
                </div>
                <div className="twoCol">
                  {/* country */}
                  <FloatingLabel
                    controlId="country"
                    label="Country"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Country"
                      name="country"
                      value={astrologers.country}
                      onChange={handleChange}
                    />
                  </FloatingLabel>
                  {/* pincode */}
                  <FloatingLabel
                    controlId="pincode"
                    label="Pincode"
                    className="mb-3"
                  >
                    <Form.Control
                      type="tel"
                      placeholder="Pincode"
                      name="pincode"
                      value={astrologers.pincode}
                      onChange={handleChange}
                    />
                  </FloatingLabel>
                </div>
                {/* charges for call & chat */}
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
                      value={astrologers.chat}
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
                      value={astrologers.call}
                      onChange={handleChange}
                    />
                  </FloatingLabel>
                </div>
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
                      value={astrologers.displaychat}
                      onChange={handleChange}
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="call charges"
                    label="Call charges(display)"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Call"
                      name="displaycall"
                      value={astrologers.displaycall}
                      onChange={handleChange}
                    />
                  </FloatingLabel>
                </div>
                {/* select category */}
                <div className="mb-3 threeCol">
                  <div>
                    <p className="title_addastro">Methodology</p>
                    <FloatingLabel
                      controlId="methodolgy"
                      label="Methodology"
                      className="mb-3"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Methodology"
                        name="methodology"
                        disabled="baned"
                        value={
                          selectedCategories.join(", ")
                            ? selectedCategories.join(", ")
                            : astrologers.category
                        }
                        onChange={(e) => setSelectedCategory(e.target.value)}
                      />
                    </FloatingLabel>
                    <Dropdown onSelect={handleDropdownSelectCategory}>
                      <Dropdown.Toggle id="dropdown-basic">
                        Astrology
                      </Dropdown.Toggle>

                      <Dropdown.Menu className="drop_menu">
                        {categories?.map((cat, index) => (
                          <>
                            <div className="customDrop">
                              <Form.Check
                                type="checkbox"
                                name={cat?.category[0]?.name}
                                eventKey={cat?.category[0]?.name}
                                key={index}
                                onChange={handleChangeCategory}
                              />{" "}
                              {cat?.category[0]?.name}
                            </div>
                          </>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                    <p className="errormsg">
                      {errors.category && errors.category.message}
                    </p>
                  </div>
                  {/* languages */}
                  <div>
                    <p className="title_addastro">Language</p>
                    <FloatingLabel
                      controlId="language"
                      label="Language"
                      className="mb-3"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Language"
                        name="language"
                        disabled="baned"
                        value={
                          selectedLanguages.join(", ")
                            ? selectedLanguages.join(", ")
                            : astrologers.language
                        }
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                      />
                    </FloatingLabel>
                    <Dropdown onSelect={handleDropdownSelectLanguages}>
                      <Dropdown.Toggle id="dropdown-basic">
                        Languages
                      </Dropdown.Toggle>

                      <Dropdown.Menu className="drop_menu">
                        {languages?.map((cat, index) => (
                          <>
                            <div className="customDrop">
                              <Form.Check
                                type="checkbox"
                                name={cat?.language[0]?.name}
                                value={cat?.language[0]?.name}
                                key={index}
                                onChange={handleChangeLanguage}
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
                <p className="title_addastro">Astrology related details</p>
                <div className="threeCol">
                  {/* experience */}
                  <FloatingLabel
                    controlId="experience"
                    label="Experience in Yrs"
                    className="mb-3"
                  >
                    <Form.Control
                      type="number"
                      placeholder="experience"
                      name="experience"
                      value={astrologers.experience}
                      onChange={handleChange}
                    />
                  </FloatingLabel>
                  {/* spend time */}
                  <FloatingLabel
                    controlId="maxTime"
                    label="Max time spent in Astro5Star per day (in Hrs)"
                    className="mb-3"
                  >
                    <Form.Control
                      type="number"
                      placeholder="maxTime"
                      name="maxTime"
                      value={astrologers.maxTime}
                      onChange={handleChange}
                    />
                  </FloatingLabel>
                  {/* certificate */}
                  <div className="mb-3">
                    <Form.Group>
                      <div className="pic-lable">
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
                          <div key={index} className="image_contain">
                            <img src={pic.file} alt="" className="image_pre" />

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
                {/* Institute */}
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
                      value={astrologers.institute}
                      onChange={handleChange}
                    />
                  </FloatingLabel>
                </div>
                {/* about description */}

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
                      value={astrologers.astrologyDescription}
                      onChange={handleChange}
                    />
                  </FloatingLabel>
                  {errors.astrologyDescription && (
                    <p className="errormsg">{errors.astrologyDescription}</p>
                  )}
                </div>

                {/* astrology experience */}
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
                      value={astrologers.astrologyExperience}
                      onChange={handleChange}
                    />
                  </FloatingLabel>
                  {errors.astrologyExperience && (
                    <p className="errormsg">{errors.astrologyExperience}</p>
                  )}
                </div>

                {/* area of expertise */}
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
                      value={astrologers.astrologyExpertise}
                      onChange={handleChange}
                    />
                  </FloatingLabel>
                  {errors.astrologyExpertise && (
                    <p className="errormsg">{errors.astrologyExpertise}</p>
                  )}
                </div>
                {/* kown about us */}

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
                      value={astrologers.knowus}
                      onChange={handleChange}
                    />
                  </FloatingLabel>
                  {errors.knowus && <p className="errormsg">{errors.knowus}</p>}
                </div>
                {/* button group */}

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
        )}
      </main>
    </div>
  );
}

export default EditAstrologer;
