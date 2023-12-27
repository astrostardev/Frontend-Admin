import React, { useState, useEffect } from "react";
import "../Stylesheets/ViewProfile.scss";
import astrologer from "../Assests/astrologer.jpg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap"
import dayjs from 'dayjs';
import moment from "moment"

function ViewProfile() {
    const [isLoading, setIsloading] = useState(false)
    const [astrologers, setAstrologers] = useState(null)
    const navigate = useNavigate()
    const { id } = useParams()
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsloading(true)
                const response = await fetch(`${process.env.REACT_APP_URL}/api/v1/astrologer/getAstrologer/${id}`, {
                    method: 'GET',
                });

                if (!response.ok) {
                    // Handle non-successful response (e.g., 404 Not Found)
                    alert(`Error: ${response.status} - ${response.statusText}`);
                    return;
                } else {
                    setIsloading(false)
                    const data = await response.json();
                    // console.log(data);
                    setAstrologers(data)
                    // console.log('astro', astrologers);
                }

            } catch (error) {
                alert('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    async function handleDelete() {
        setIsloading(true)
        const res = await fetch(`${process.env.REACT_APP_URL}/api/v1/astrologer/delete/${id}`, {
            method: "DELETE"
        })
        console.log(res);
        if (res.ok) {
            alert("successfully deleted")
            navigate("/astrologers")
        } else {
            alert("Try again")
        }
    }
    return (
        <div className="infoContainer">
            {isLoading ?
                <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                    <Spinner animation="grow" className="text-center" variant="warning" />
                </div>
                :
                <main className="card profile_container">
                    <section className="viewProfile-head">
                        <div>
                            <h3>Profile</h3>
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
                        <div className="btnGroup">
                            <button className="btns" onClick={() => navigate(`/editastrologer/${astrologers?.astrologer?._id}`)} disabled={isLoading}>Edit</button>
                            <Button variant="danger" onClick={handleDelete} >Delete</Button>
                        </div>
                    </section>
                    <h3 style={{ textDecoration: "underline", marginBottom: "20px", marginTop: "20px" }}>
                        Basic Details
                    </h3>

                    <article className="profile_detail">
                        <div className="my-4">
                            <h5>Astrologer ID</h5>
                            <p>{astrologers?.astrologer?.astrologerID}</p>
                        </div>
                        <div className="my-4">
                            <h5>isActive</h5>
                            <p>{astrologers?.astrologer?.isActive == "Yes" ? "Yes" : "No"}</p>
                        </div>
                        <div className="my-4">
                            <h5>Firstname</h5>
                            <p>{astrologers?.astrologer?.firstname}</p>
                        </div>

                        <div className="my-4">
                            <h5>Lastname</h5>
                            <p>{astrologers?.astrologer?.lastname}</p>
                        </div>
                        <div className="my-4">
                            <h5>Date of Birth</h5>
                            <p>{dayjs(astrologers?.astrologer?.dob).format('DD/MM/YYYY')}</p>
                        </div>
                        <div className="my-4">
                            <h5>Photo</h5>
                            <div className="img">
                                {/* <img src={astrologers?.astrologer?.profilePic[0]?.pic} alt='' /> */}
                                {/* <img src={astrologers?.astrologer?.profilePic[0].pic} alt="" /> */}
                            </div>
                        </div>
                        <div className="my-4">
                            <h5>Gender</h5>
                            <p>{astrologers?.astrologer?.gender}</p>
                        </div>

                        <div className="my-4">
                            <h5>Email address</h5>
                            <p>{astrologers?.astrologer?.email}</p>
                        </div>

                        <div className="my-4">
                            <h5>Primary Mobile No</h5>
                            <p>{astrologers?.astrologer?.mobilePrimary}</p>
                        </div>

                        <div className="my-4">
                            <h5>Secondry Mobile No</h5>
                            <p>{astrologers?.astrologer?.mobileSecondary}</p>
                        </div>

                        <div className="my-4">
                            <h5>Education Qualification</h5>
                            <p>{astrologers?.astrologer?.qualifications}</p>
                        </div>

                        <div className="my-4">
                            <h5>Address</h5>
                            <p>{astrologers?.astrologer?.address}</p>
                        </div>
                        <div className="my-4">
                            <h5>District</h5>
                            <p>{astrologers?.astrologer?.district}</p>
                        </div>
                        <div className="my-4">
                            <h5>State</h5>
                            <p>{astrologers?.astrologer?.state}</p>
                        </div>
                        <div className="my-4">
                            <h5>Country</h5>
                            <p>{astrologers?.astrologer?.country}</p>
                        </div>
                        <div className="my-4">
                            <h5>Pincode</h5>
                            <p>{astrologers?.astrologer?.pincode}</p>
                        </div>
                        <div className="my-4">
                            <h5>Chat</h5>
                            <p>{astrologers?.astrologer?.chat}</p>
                        </div>
                        <div className="my-4">
                            <h5>Call</h5>
                            <p>{astrologers?.astrologer?.call}</p>
                        </div>
                        <div className="my-4">
                            <h5>Methodology</h5>
                            <p>{astrologers?.astrologer?.category}</p>
                        </div>  <div className="my-4">
                            <h5>Language</h5>
                            <p>{astrologers?.astrologer?.language}</p>
                        </div>
                        <h3 style={{ textDecoration: "underline", marginBottom: "20px" }}>
                            Astrology Related Details
                        </h3>

                        <div className="my-4">
                            <h5>Astrology School Name / Guru Name</h5>
                            <p>{astrologers?.astrologer?.institute}</p>
                        </div>
                        <div className="my-4">
                            <h5>Experience in Yrs</h5>
                            <p>{astrologers?.astrologer?.experience}</p>
                        </div>

                        <div className="my-4">
                            <h5>Certificates</h5>
                            <div className="img">
                                {/* {astrologers?.astrologer?.certificates.map((file) => (
                                    <img src={file.file} alt="" />
                                ))} */}



                            </div>
                        </div>
                        <div className="my-4">
                            <h5>What do you mean by astrology?</h5>
                            <p>
                                {astrologers?.astrologer?.astrologyDescription}

                            </p>
                        </div>
                        <div className="my-4">
                            <h5>Describe about your experience you gained in astrology?</h5>
                            <p>
                                {astrologers?.astrologer?.astrologyExperience}
                            </p>
                        </div>

                        <div className="my-4">
                            <h5>Describe about your individuality in astrology?</h5>
                            <p>
                                {astrologers?.astrologer?.astrologyExpertise}
                            </p>
                        </div>

                        <div className="my-4">
                            <h5>How do you know about us?</h5>
                            <p>
                                {astrologers?.astrologer?.knowus}
                            </p>
                        </div>

                        <div className="my-4">
                            <h5>Maximum time you can spent in Astro5Star per day(in Hrs)?</h5>
                            <p>
                                {astrologers?.astrologer?.maxTime}

                            </p>
                        </div>

                    </article>

                    <div className="btnGroup">
                        <button className="btns" onClick={() => navigate(`/editastrologer/${astrologers?.astrologer?._id}`)} disabled={isLoading}>Edit</button>
                        <Button variant="danger" onClick={handleDelete} >Delete</Button>
                    </div>
                </main>
            }
        </div>
    );
}

export default ViewProfile;