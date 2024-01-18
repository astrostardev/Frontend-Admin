import React, { useState, useEffect } from "react";
import "../../Stylesheets/ViewProfile.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap"
import moment from "moment"
import MetaData from "../../Components/MetaData";
function ViewUserprofile() {
    const [isLoading, setIsloading] = useState(false)
    const [users, setUsers] = useState(null)
    const navigate = useNavigate()
    const { id } = useParams()
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsloading(true)
                const response = await fetch(`${process.env.REACT_APP_URL}/api/v1/user/getuser/${id}`, {
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
                    setUsers(data)
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
        <MetaData title={'Astro5Star-Manager'} />
            
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
                        {/* <div className="btnGroup">
                            <button className="btns" onClick={() => navigate(`/edituser/${users?.user?._id}`)} disabled={isLoading}>Edit</button>
                            <Button variant="danger" onClick={handleDelete} >Delete</Button>
                        </div> */}
                    </section>
                    <h3 style={{ textDecoration: "underline", marginBottom: "20px", marginTop: "20px" }}>
                        Basic Details
                    </h3>

                    <article className="profile_detail">
                     
                    
                        <div className="my-4">
                            <h5>Name</h5>
                            <p>{users?.user?.name}</p>
                        </div>

                        <div className="my-4">
                            <h5>Mobile Number</h5>
                            <p>{users?.user?.phoneNo}</p>
                        </div>
                        <div className="my-4">
                            <h5>Register Time</h5>
                            <p>{users?.user?.registerTime ? moment(users?.user?.registerTime).format('MMMM Do YYYY, h:mm:ss a') : ''}</p>
                        </div>
                        <div className="my-4">
                            <h5>Last Login Time</h5>
                            <p>{users?.user?.loginTime ? moment(users?.user?.loginTime).format('MMMM Do YYYY, h:mm:ss a') : ''}</p>
                        </div>
                        <div className="my-4">
                            <h5>Last Call Duration</h5>
                            <p>{users?.user?.callDuration}</p>
                        </div>
                    </article>

                    {/* <div className="btnGroup">
                        <button className="btns" onClick={() => navigate(`/edituser/${users?.user?._id}`)} disabled={isLoading}>Edit</button>
                        <Button variant="danger" onClick={handleDelete} >Delete</Button>
                    </div> */}
                </main>
            }
        </div>
    );
}

export default ViewUserprofile;