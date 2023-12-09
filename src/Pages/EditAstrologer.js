import { Link, useNavigate, useParams } from "react-router-dom"
import "../Stylesheets/Addastrologer.scss"
import { Box } from "@mui/material";
import { FloatingLabel, Form, Spinner } from 'react-bootstrap';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState, useEffect } from "react"
import { IoMdTrash } from "react-icons/io";
import { useForm } from "react-hook-form";
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import moment from "moment";


function EditAstrologer() {
    const [isLoading, setIsloading] = useState(false)
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
        astrologyDescription: "",
        astrologyExperience: "",
        astrologyExpertise: "",
        knowus: "",
        maxTime: "",
        isActive: "",
        call:"",
        chat:""
    })
    const [dob, setDob] = useState(null);
    const [doberr, setDoberr] = useState(false)
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
        pincode: "",
        institute: "",
        experience: "",
        astrologyDescription: "",
        astrologyExperience: "",
        astrologyExpertise: "",
        knowus: "",
        maxTime: "",
        isActive: "",
        call:"",
        chat:""
    });
    const { id } = useParams()
    const navigate = useNavigate()
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Validation logic
        let error = '';
        if (name === 'firstname' && value.length === 0) {
            error = "Firstname is required";
        } else if (name === 'lastname' && value.length === 0) {
            error = "Lastname is required";
        } else if (name === 'gender' && !value) {
            error = "Please select a gender";
        } else if (name === 'email' && !/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(value)) {
            error = 'Invalid email address';
        } else if (name === 'mobilePrimary' && !/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(value)) {
            error = 'Invalid Primary mobile number';
        } else if (name === 'mobileSecondary' && !/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(value)) {
            error = 'Invalid Secondary mobile number';
        } else if (name === 'astrologyDescription' && value.split(" ").length > 50) {
            error = "Describe in 50 Words";
        } else if (name === 'astrologyExperience' && value.split(" ").length > 50) {
            error = "Describe in 50 Words";
        } else if (name === 'astrologyExpertise' && value.split(" ").length > 50) {
            error = "Describe in 50 Words";
        } else if (name === 'knowus' && value.split(" ").length > 50) {
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
        const fetchData = async () => {
            try {
                const response = await fetch(`https://shy-gold-sawfish-robe.cyclic.app/api/v1/astrologer/getAstrologer/${id}`, {
                    method: 'GET',
                });

                if (!response.ok) {
                    // Handle non-successful response (e.g., 404 Not Found)
                    console.error(`Error: ${response.status} - ${response.statusText}`);
                    return;
                }

                const data = await response.json();
                console.log(data);
                setAstrologers(data?.astrologer)
                console.log('astro', astrologers);
                setDob(dayjs(data?.astrologer?.dob))
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);



    const onSubmit = (async (e) => {
        e.preventDefault();
        setIsloading(true)

        if (dob) {
            // console.log(data);
            // console.log(dob);
            // console.log(certificates);
            // console.log(profilePhoto);

            if (Object.values(errors).every((error) => !error)) {
                // No errors, submit the data
                // console.log('Form data submitted:', astrologers);
                const updatedDetails = new FormData();
                updatedDetails.append("firstname", astrologers.firstname)
                updatedDetails.append("lastname", astrologers.lastname)
                updatedDetails.append("gender", astrologers.gender)
                updatedDetails.append("email", astrologers.email)
                updatedDetails.append("mobilePrimary", astrologers.mobilePrimary)
                updatedDetails.append("mobileSecondary", astrologers.mobileSecondary)
                updatedDetails.append("isActive", astrologers.isActive)
                updatedDetails.append("dob", dob)
                updatedDetails.append("qualifications", astrologers.qualifications)
                updatedDetails.append("address", astrologers.address)
                updatedDetails.append("district", astrologers.district)
                updatedDetails.append("state", astrologers.state)
                updatedDetails.append("country", astrologers.country)
                updatedDetails.append("pincode", astrologers.pincode)
                updatedDetails.append("call", astrologers.call)
                updatedDetails.append("chat", astrologers.chat)
                updatedDetails.append("institute", astrologers.institute)
                updatedDetails.append("experience", astrologers.experience)
                updatedDetails.append("astrologyDescription", astrologers.astrologyDescription)
                updatedDetails.append("astrologyExperience", astrologers.astrologyExperience)
                updatedDetails.append("astrologyExpertise", astrologers.astrologyExpertise)
                updatedDetails.append("knowus", astrologers.knowus)
                updatedDetails.append("maxTime", astrologers.maxTime)
                console.log('updated details', updatedDetails);

                const response = await fetch(`https://shy-gold-sawfish-robe.cyclic.app/api/v1/astrologer/update/${id}`, {
                    method: "PATCH",
                    body: updatedDetails

                });
                console.log(response)
                if (response.ok === false) {
                    alert("Updated failed");
                    setIsloading(false)
                } else {
                    alert("Updated successfully");
                    navigate(`/astrologer/${id}`)
                }
            } else {
                // There are errors, handle accordingly (e.g., display an error message)
                console.log('Form submission failed due to validation errors.');
                setIsloading(false)
            }
            // setCertificates([])
            // setProfilePhoto(null)
        } else {
            setDoberr(true)
            setIsloading(false)
        }
    })
    return (
        <div className="infoContainer">
            <main id="admin-addastro">
                <section className="astro-head">
                    <div>
                        <h3>Astrologer Update</h3>
                        <div style={{ height: "3px", width: "40px", backgroundColor: "#0042ae", borderRadius: "10px", marginTop: "3px" }}></div>
                    </div>
                </section>
                <section className="my-4">
                    <Form className="reg-form" onSubmit={onSubmit} encType="multipart/form-data" >
                        <article className="basicDetails">
                            <p style={{ fontSize: "16px", textDecoration: "underline" }}>Basic details</p>

                            <div className="threeCol">
                                {/* FirstName */}

                                <div className="mb-3" >
                                    <FloatingLabel
                                        controlId="firstname"
                                        label="First Name"
                                    >
                                        <Form.Control type="text" placeholder="firstname" name="firstname" value={astrologers?.firstname} onChange={handleChange} />
                                    </FloatingLabel>
                                    {errors.firstname && <p className="errormsg">{errors.firstname}</p>}
                                </div>

                                {/* lastName */}
                                <div className="mb-3">
                                    <FloatingLabel
                                        controlId="lastname"
                                        label="Last Name"
                                    >
                                        <Form.Control type="text" placeholder="lastname" name="lastname" value={astrologers?.lastname} onChange={handleChange} />
                                    </FloatingLabel>
                                    {errors.lastname && <p className="errormsg">{errors.lastname}</p>}
                                </div>
                                <div className="mx-2">
                                    <Form.Label className="me-3" style={{ display: "block" }} >IsActive</Form.Label>
                                    <Form.Check type="radio" label="Yes" name="isActive" inline id="inline-radio-1" value="Yes" checked={astrologers?.isActive === "Yes"} onChange={handleChange} />
                                    <Form.Check type="radio" label="No" name="isActive" inline id="inline-radio-2" value="No" checked={astrologers?.isActive === "No"} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="threeCol">
                                {/* Dob */}
                                <div>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DatePicker']}  >
                                            <DatePicker label="Date of Birth" className="mb-3" value={dob} renderInput={(props) => <TextField {...props} />} onChange={(newValue) => setDob(newValue)} format="DD-MM-YYYY" maxDate={dayjs()} />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                    {doberr && <p className="errormsg">
                                        Enter DOB
                                    </p>}
                                </div>
                                {/* Gender */}
                                <div className="mb-3">
                                    <div className="mx-2">
                                        <Form.Label className="me-3" style={{ display: "block" }} >Select Gender</Form.Label>
                                        <Form.Check type="radio" label="Male" name="gender" inline id="inline-radio-1" value="male" checked={astrologers?.gender === "male"} onChange={handleChange} />
                                        <Form.Check type="radio" label="Female" name="gender" inline id="inline-radio-2" value="female" checked={astrologers?.gender === "female"} onChange={handleChange} />
                                        <Form.Check type="radio" label="Others" name="gender" inline id="inline-radio-3" value="others" checked={astrologers?.gender === "others"} onChange={handleChange} />
                                    </div>
                                    {errors.gender && <p className="errormsg">{errors.gender}</p>}

                                </div>

                                <div className="mb-3">
                                    <p>Working...</p>
                                    {/* <FloatingLabel
                                        controlId="photo"
                                        label="Profile Photo"

                                    >
                                        <Form.Control type="file" placeholder="Profile Photo" name="Profile Photo" onChange={handlePhoto} accept="image/png, image/jpeg" />
                                    </FloatingLabel>

                                    {photoErr && <p style={{ color: 'red' }}>{photoErr}</p>} */}
                                    {/* <img src={astrologers?.profilePic[0]?.pic} alt="" style={{width:"130px", height:"150px"}}/> */}
                                    {/* <p>Photo: {profilePhoto?.name}</p> */}
                                </div>
                            </div>
                            <div className="threeCol">
                                {/* Email */}
                                <div className="mb-3">
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Email address"
                                    >
                                        <Form.Control type="email" placeholder="name@example.com" name="email" value={astrologers?.email} onChange={handleChange} />
                                    </FloatingLabel>
                                    {errors.email && <p className="errormsg">{errors.email}</p>}

                                </div>
                                {/* MobileNo */}
                                <div className="mb-3">
                                    <FloatingLabel
                                        controlId="mobilePrimary"
                                        label="Primary Mobile No."

                                    >
                                        <Form.Control type="tel" placeholder="mobilePrimary" name="mobilePrimary" value={astrologers?.mobilePrimary} onChange={handleChange} />
                                    </FloatingLabel>
                                    {errors.mobilePrimary && <p className="errormsg">{errors.mobilePrimary}</p>}
                                </div>
                                <div className="mb-3">
                                    <FloatingLabel
                                        controlId="mobileSecondary"
                                        label="Secondary Mobile No."

                                    >
                                        <Form.Control type="tel" placeholder="mobileSecondary" name="mobileSecondary" value={astrologers?.mobileSecondary} onChange={handleChange} />
                                    </FloatingLabel>
                                    {errors.mobileSecondary && <p className="errormsg">{errors.mobileSecondary}</p>}

                                </div>
                            </div>
                            <div className="twoCol">
                                {/* Education */}
                                <FloatingLabel
                                    controlId="qualifications"
                                    label="Educational Qualifications"
                                    className="mb-3"
                                >
                                    <Form.Control type="text" placeholder="qualifications" name="qualifications" value={astrologers?.qualifications} onChange={handleChange} />
                                </FloatingLabel>

                                {/* Address */}
                                <FloatingLabel
                                    controlId="address"
                                    label="Address"
                                    className="mb-3"
                                >
                                    <Form.Control type="text" placeholder="address" name="address" value={astrologers?.address} onChange={handleChange} />
                                </FloatingLabel>
                            </div>
                            <div className="twoCol">
                                <FloatingLabel
                                    controlId="district"
                                    label="District"
                                    className="mb-3"
                                >
                                    <Form.Control type="text" placeholder="District" name="district" value={astrologers?.district} onChange={handleChange} />
                                </FloatingLabel>
                                <FloatingLabel
                                    controlId="state"
                                    label="State"
                                    className="mb-3"
                                >
                                    <Form.Control type="text" placeholder="State" name="state" value={astrologers?.state} onChange={handleChange} />
                                </FloatingLabel>
                            </div>
                            <div className="twoCol">
                                <FloatingLabel
                                    controlId="country"
                                    label="Country"
                                    className="mb-3"
                                >
                                    <Form.Control type="text" placeholder="Country" name="country" value={astrologers?.country} onChange={handleChange} />
                                </FloatingLabel>
                                <FloatingLabel
                                    controlId="pincode"
                                    label="Pincode"
                                    className="mb-3"
                                >
                                    <Form.Control type="tel" placeholder="Pincode" name="pincode" value={astrologers?.pincode} onChange={handleChange} />
                                </FloatingLabel>
                            </div>
                            <div className="twoCol" >
                                <FloatingLabel
                                    controlId="chat charges"
                                    label="Chat charges"
                                    className="mb-3"
                                >
                                    <Form.Control type="text" placeholder="Chat" name="chat"  value={astrologers?.chat} onChange={handleChange} />
                                </FloatingLabel>
                                <FloatingLabel
                                    controlId="call charges"
                                    label="Call charges"
                                    className="mb-3"
                                >
                                    <Form.Control type="tel" placeholder="Call" name="call" value={astrologers?.call} onChange={handleChange} />
                                </FloatingLabel>
                            </div>
                        </article>
                        <hr />
                        <article className="astroDetails my-3">
                            <p style={{ fontSize: "16px", textDecoration: "underline" }} >Astrology related details</p>

                            <div className="threeCol">
                                <FloatingLabel
                                    controlId="experience"
                                    label="Experience in Yrs"
                                    className="mb-3"
                                >
                                    <Form.Control type="number" placeholder="experience" name="experience" value={astrologers?.experience} onChange={handleChange} />
                                </FloatingLabel>
                                <FloatingLabel
                                    controlId="maxTime"
                                    label="Max time spent in Astro5Star per day (in Hrs)"
                                    className="mb-3"
                                >
                                    <Form.Control type="number" placeholder="maxTime" name="maxTime" value={astrologers?.maxTime} onChange={handleChange} />
                                </FloatingLabel>
                                <div>
                                    {/* <FloatingLabel
                                        controlId="certificates"
                                        label="Course certificates"
                                        className="mb-3"
                                    >
                                        <Form.Control type="file" placeholder="certificates" name="certificates" onChange={handleFileUpload} accept="image/png, image/jpeg, .pdf" />
                                    </FloatingLabel>

                                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                                    {astrologers?.astrologer?.certificates.map((file, index) => (
                                        <>  <img key={index} src={file.file} alt="" /> <span><IoMdTrash style={{ fontSize: "18px" }} /> </span></>
                                    ))} */}
                                    <p>Working...</p>
                                </div>
                            </div>
                            <div>
                                <div className="mb-3">
                                    <FloatingLabel
                                        controlId="institute"
                                        label="Astrology School Name/ Guru Name"
                                    >
                                        <Form.Control as="textarea" style={{ height: '100px' }} placeholder="institute" name="institute" value={astrologers?.institute} onChange={handleChange} />
                                    </FloatingLabel>
                                </div>
                            </div>
                            <div>
                                <div className="mb-3">
                                    <FloatingLabel
                                        controlId="astrology-description"
                                        label="What do you mean by Astrology? (Max 50 words)"
                                    >
                                        <Form.Control as="textarea" style={{ height: '100px' }} placeholder="astrology-description" name="astrologyDescription" value={astrologers?.astrologyDescription} onChange={handleChange} />
                                    </FloatingLabel>
                                    {errors.astrologyDescription && <p className="errormsg">{errors.astrologyDescription}</p>}

                                </div>
                            </div>
                            <div>
                                <div className="mb-3">
                                    <FloatingLabel
                                        controlId="astrology-experience"
                                        label="Describe about the experience you gained in Astrology? (Max 50 words)"
                                    >
                                        <Form.Control as="textarea" style={{ height: '100px' }} placeholder="astrology-experience" name="astrologyExperience" value={astrologers?.astrologyExperience} onChange={handleChange} />
                                    </FloatingLabel>
                                    {errors.astrologyExperience && <p className="errormsg">{errors.astrologyExperience}</p>}

                                </div>
                            </div>
                            <div>
                                <div className="mb-3">
                                    <FloatingLabel
                                        controlId="astrology-expertise"
                                        label="Describe about your individuality in Astrology? (i.e)Area of Expertise (Max 50 words)"

                                    >
                                        <Form.Control as="textarea" style={{ height: '100px' }} placeholder="astrology-expertise" name="astrologyExpertise" value={astrologers?.astrologyExpertise} onChange={handleChange} />
                                    </FloatingLabel>
                                    {errors.astrologyExpertise && <p className="errormsg">{errors.astrologyExpertise}</p>}

                                </div>
                            </div>
                            <div>
                                <div className="mb-3">
                                    <FloatingLabel
                                        controlId="Know-us"
                                        label="How do you know about us?(Max 50 words)"
                                    >
                                        <Form.Control as="textarea" style={{ height: '100px' }} placeholder="Know-us" name="knowus" value={astrologers?.knowus} onChange={handleChange} />
                                    </FloatingLabel>
                                    {errors.knowus && <p className="errormsg">{errors.knowus}</p>}

                                </div>
                            </div>

                            <div className="btnGroup">
                                <div>
                                    <button type="submit" id="submitBtn" className="btns" disabled={isLoading}>
                                        {isLoading ?
                                            <Spinner animation="grow" className="text-center" />
                                            : <>Submit</>
                                        }
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
            </main >
        </div>

    )

}


export default EditAstrologer